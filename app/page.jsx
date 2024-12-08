"use client";

import { useEffect, useState, useRef } from "react";
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { socket } from "./socket";

export default function Home() {
  let defaultColor, defaultTextColor = ["slate", "white"]
  const defaultMessage = (messageInfo = {}, userInfo = {}) => ({
    id: uuidv4(),
    timestamp: new Date().toISOString(),
    messageInfo: {
      messageText: messageInfo?.messageText || "",
      messageColor: messageInfo?.messageColor || defaultColor,
      isDeleted: messageInfo?.isDeleted || false,
    },
    userInfo: {
      name: userInfo?.name || "Guest",
      userid: userInfo?.userid || uuidv4(),
    },
  });
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [message, setMessage] = useState(defaultMessage());
  const [chatMessages, setChatMessages] = useState([]);
  const lastMessageRef = useRef(null);
  const inputRef = useRef(null);

  const updateMessageText = (msg) => {
    setMessage((prevState) => ({
      ...prevState,
      messageInfo: {
        ...prevState.messageInfo,
        messageText: msg,
      },
    }));
  };

  const updateMessageColor = (msg) => {
    setMessage((prevState) => ({
      ...prevState,
      messageInfo: {
        ...prevState.messageInfo,
        messageColor: msg,
      },
    }));
  };

  const editMessage = (id, updatedFields) => {
    //Example: Mark a message as deleted 
    //updateMessageText("123", { message: { ...newMessage.message, isDeleted: true } });
    setChatMessages((prevMessages) => {
      prevMessages.map((msg) => {
        msg.id === id ? {...msg, ...updatedFields } : msg
      })
    })
  }

  const submitMessage = (e) => {
    e.preventDefault();
    console.log(message)
    socket.emit("message", message);
    setMessage(defaultMessage);
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    inputRef.current.focus();
  }

  const compareDateAndMakeReadable = (isoString) => {
    const date = new Date(isoString);
    const today = new Date();
    
    // Set the time part of today to 00:00:00 to make the comparison only based on the date
    today.setHours(0, 0, 0, 0);
    
    let options = {};
    
    if (date >= today) {
      // If the date is today, show only the time
      options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true, // Use 12-hour format
      };
    } else {
      // If the date is not today, show the full date and time
      options = {
        year: 'numeric',
        month: 'long', // e.g., December
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true, // Use 12-hour format
      };
    }
  
    // Convert to a readable format
    return date.toLocaleString('en-US', options);
  }

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    } else {
      console.log("Socket not connected!")
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });

      socket.emit('getChatHistory');

      socket.on('messageHistory', (history) => {
        setChatMessages(history);
      })
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("message", (msg) => {
      setChatMessages((prevChatMessages) => [...prevChatMessages, msg]);
    })

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  useEffect(() => {
    if (chatMessages && chatMessages.length) {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }
  },[chatMessages])

  return (
    <>
      <div className="flex flex-col h-screen w-full">
        {/* Chat message box takes up 80% of the screen height */}
        <div className="chatMessageBox flex-grow w-full overflow-auto p-4">
          <ul className="list-none">
            {chatMessages && chatMessages?.map((m) => {
              return (
                <li key={m.id} 
                  className={
                    classNames({[`bg-${m.messageInfo.messageColor} text-${defaultTextColor} rounded-lg m-2 p-4`]: m.messageInfo.messageColor, [`bg-black text-${defaultTextColor} rounded-lg m-2 p-4`]:!m.messageInfo.messageColor,})}>
                  {!m.messageInfo.isDeleted && 
                    <div className="text-balance">
                      {m.userInfo.name}&nbsp;({compareDateAndMakeReadable(m.timestamp)}) -  
                      <span
                        style={{
                          wordWrap: 'break-word', // Ensures long words are wrapped
                          wordBreak: 'break-word', // Breaks long words if necessary
                          display: 'inline-block', // Makes the span behave like a block element
                        }}
                      >
                      &nbsp;{m.messageInfo.messageText}
                      </span>
                    </div>
                  }
                </li>
              )
            })}
          </ul>
          <div ref={lastMessageRef} />
        </div>

        {/* Form at the bottom */}
        <div className="flex flex-row w-full p-4 md:mb-12 mb-16">
          <form
            onSubmit={(e) => { submitMessage(e) }}
            className="w-full flex justify-center"
          >
            <select 
            defaultValue={message.messageInfo.messageColor || "slate"}
            onChange={(e) => {updateMessageColor(e.target.value)}} 
            className={
              classNames({[`select w-1/12 h-10 rounded-xl mr-2 bg-${message.messageInfo.messageColor} text-white`]: message.messageInfo.messageColor, 'select w-1/12 h-10 rounded-xl mr-2 bg-slate text-white':!message.messageInfo.messageColor,})}>
              <option value="black" style={{backgroundColor: "black", color: "white"}}>Text bubble background color</option>
              <option value="slate" style={{backgroundColor: "#475569", color: "white"}}>Slate</option>
              <option value="red" style={{backgroundColor: "#dc2626", color: "white"}}>Red</option>
              <option value="orange" style={{backgroundColor: "#ea580c", color: "white"}}>Orange</option>
              <option value="amber" style={{backgroundColor: "#d97706", color: "white"}}>Amber</option>
              <option value="yellow" style={{backgroundColor: "#ca8a04", color: "white"}}>Yellow</option>
              <option value="lime" style={{backgroundColor: "#65a30d", color: "white"}}>Lime</option>
              <option value="green" style={{backgroundColor: "#16a34a", color: "white"}}>Green</option>
              <option value="emerald" style={{backgroundColor: "#059669", color: "white"}}>Emerald</option>
              <option value="teal" style={{backgroundColor: "#0d9488", color: "white"}}>Teal</option>
              <option value="cyan" style={{backgroundColor: "#0891b2", color: "white"}}>Cyan</option>
              <option value="sky" style={{backgroundColor: "#0284c7", color: "white"}}>Sky</option>
              <option value="blue" style={{backgroundColor: "#2563eb", color: "white"}}>Blue</option>
              <option value="indigo" style={{backgroundColor: "#4f46e5", color: "white"}}>Indigo</option>
              <option value="violet" style={{backgroundColor: "#7c3aed", color: "white"}}>Violet</option>
              <option value="purple" style={{backgroundColor: "#9333ea", color: "white"}}>Purple</option>
              <option value="fuchsia" style={{backgroundColor: "#c026d3", color: "white"}}>Fuchsia</option>
              <option value="pink" style={{backgroundColor: "#db2777", color: "white"}}>Pink</option>
              <option value="rose" style={{backgroundColor: "#e11d48", color: "white"}}>Rose</option>
            </select>
            {/* Input: 80% width, centered */}
            <input
              className={
                classNames({[`chatInput w-8/12 h-12 p-2 bg-${message.messageInfo.messageColor} rounded-lg md:min-w-56 placeholder-white text-white`]: message.messageInfo.messageColor, 'chatInput w-8/12 h-12 p-2 bg-slate rounded-lg md:min-w-56 placeholder-white text-white':!message.messageInfo.messageColor,})}
              ref={inputRef}
              onChange={(e) => { updateMessageText(e.target.value) }}
              value={message?.messageInfo?.messageText}
              placeholder="Type your message here"
              maxLength="255"
              required
            />
            
            {/* Button next to input */}
            <button
              className="w-24 h-12 bg-emerald text-white rounded-lg ml-2 bg-yellow text-white"
            >
              Send
            </button>
          </form>
        </div>

        {/* Connection status */}
        <p className="absolute bottom-4 left-4 text-white hidden sm:block">
          Status: {isConnected ? "Connected" : "Disconnected"} - Transport: {transport}
        </p>
      </div>
    </>
  );
}