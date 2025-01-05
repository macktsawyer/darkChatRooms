"use client";

import { useEffect, useState, useRef, FormEvent } from "react";
import { authOptions } from './api/auth/[...nextauth]/route';
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import DOMPurify from 'dompurify';
import { socket } from "./socket";

export default function Home() {
  let defaultColor: string = "slate";
  let defaultTextColor: string = "white"; 

  const defaultMessage = (messageInfo ={
    messageText: "",
    messageColor: "",
    isDeleted: false
  }) => ({
    id: uuidv4(),
    timestamp: new Date().toISOString(),
    messageInfo: {
      messageText: messageInfo?.messageText || "",
      messageColor: messageInfo?.messageColor || defaultColor,
      isDeleted: false,
    },
    userInfo: {
      name: "Guest",
      userid: uuidv4(),
    },
  }); //userInfo.name won't default to Guest. userInfo.userid won't default to making a new uuid.

  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [message, setMessage] = useState(defaultMessage());
  const [chatMessages, setChatMessages] = useState([]);
  const lastMessageRef = useRef(null);
  const inputRef = useRef(null);
  const { data: session, status } = useSession();

  if (!session) redirect('/login');

  const filterChatMessages = (msg: string) => {

    const sanitizedMessage = msg.length ? DOMPurify.sanitize(msg) : null;

    if (sanitizedMessage) {
      console.log(sanitizedMessage)
    }
    return sanitizedMessage
  }

  // Where is message info? Nested down there
  const updateMessageText = (msg: string) => {
    setMessage((prevState) => ({ 
      ...prevState,
      messageInfo: {
        ...prevState.messageInfo,
        messageText: msg,
      },
    }));
  };

  // Dig, dig down and here is messageColor
  const updateMessageColor = (msg: string) => {
    setMessage((prevState) => ({
      ...prevState,
      messageInfo: {
        ...prevState.messageInfo,
        messageColor: msg, 
      },
    }));
  };

  // I should make a better dynamic update function here too but i...
  const updateUserName = (usr: string) => {
    setMessage((prevState) => ({
      ...prevState,
      userInfo: {
        ...prevState.userInfo,
        name: usr, 
      },
    }));
  };

  // just haven't yet
  const updateUserID = (id: string) => {
    setMessage((prevState) => ({
      ...prevState,
      userInfo: {
        ...prevState.userInfo,
        userid: id, 
      },
    }));
  };

  const submitMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // No

    const sanitizedMessageText = filterChatMessages(message.messageInfo.messageText);
  
    if (!sanitizedMessageText) {
      alert("Your message couldn't be sent due to a detection of malicious code in the message content.");
      updateMessageText('');
      return 
    }

    const messageToSend = {
      ...message,
      messageInfo: {
        ...message.messageInfo,
        messageText: sanitizedMessageText, // Sanitize here
      },
    };

    let prevColor = message.messageInfo.messageColor; // Grab the current (past) color to preserve for good UX
    socket.emit("message", messageToSend); // Emit the message to all users
    setMessage(defaultMessage()); // Reset the client's message state
    updateMessageColor(prevColor);
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" }); //Scroll to the new bottom of chat
    inputRef.current.focus(); // Keep the chat input focused on. Maximum spam for the users (currently)
  }

  const compareDateAndMakeReadable = (isoString: string | number | Date) => {
    const date = new Date(isoString); // Overall we just don't want to show the full date-time for all chat messages
    const today = new Date(); // Only the ones that are yesterday or older
    
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

    // On connect or disconnect, run the above functions
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("message", (msg) => {
      console.log('Message received: ' + msg);
      setChatMessages((prevChatMessages) => [...prevChatMessages, msg]);
    })

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message");
    };
  }, []);

  // I had to put this auto-scroll-to-bottom in it's own useEffect due to looping behavior in the above
  // Or just generally not working well with other useEffect
  useEffect(() => { 
    if (chatMessages && chatMessages.length) { 
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }
  },[chatMessages])

  useEffect(()=> {
    updateUserName(session.user.name);
    updateUserID(session.user.id);
    updateMessageColor(session.user.defaultMessageColor);
  },[session.user])

// I had to make the non-messageColor default bg-white because classNames didn't like that they ended up with same value (for bg-black)
// Overall form container. I would like to put this in it's own component at some point.
// Color select. If I get the full form container put in it's own component, I'd like this to be it's own component and optimized.
// When I say optimized, I'm thinking it reaches out to the config file or we make our own color array (which could reach out to config)
  return (
    <>
      <div className="flex flex-col h-screen w-full">
        <div className="chatMessageBox flex-grow w-full overflow-auto p-4">
          <ul className="list-none"> 
            {chatMessages && chatMessages?.map((m) => {
              return (
                <li key={m.id} 
                  className={ 
                    classNames({[`bg-${m.messageInfo.messageColor} text-${defaultTextColor} rounded-lg m-2 p-4`]: m.messageInfo.messageColor, [`bg-white text-${defaultTextColor} rounded-lg m-2 p-4`]:!m.messageInfo.messageColor})}>
                  {!m.messageInfo.isDeleted && 
                    <div className="text-balance">
                      <span></span> 
                      <span
                        style={{
                          wordWrap: 'break-word', 
                          wordBreak: 'break-word', 
                          display: 'inline-block', 
                        }}
                      >
                      {m.userInfo.name}&nbsp;- &nbsp;{m.messageInfo.messageText}
                      </span>
                      <div style={{fontSize:"10px"}}>({compareDateAndMakeReadable(m.timestamp)})</div>
                    </div>
                  }
                </li>
              )
            })}
          </ul>
          <div ref={lastMessageRef} />
        </div>

        <div className="flex flex-row w-full p-4 md:mb-12 mb-16">
          <form
            onSubmit={(e) => { submitMessage(e) }}
            className="w-full flex justify-center"
          >

            <select 
            onChange={(e) => {updateMessageColor(e.target.value)}} 
            value={message.messageInfo.messageColor || 'slate'}
            className={
              classNames({[`select w-1/12 h-10 rounded-xl mr-2 bg-${message.messageInfo.messageColor} text-white`]: message.messageInfo.messageColor, 'select w-1/12 h-10 rounded-xl mr-2 bg-white text-white':!message.messageInfo.messageColor,})}>
              <option value="black" style={{backgroundColor: "#000000", color: "white"}}>Text bubble background color</option>
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

            <input
              className={
                classNames({[`chatInput w-8/12 h-12 p-2 bg-${message.messageInfo.messageColor} rounded-lg md:min-w-56 placeholder-white text-white`]: message.messageInfo.messageColor, 'chatInput w-8/12 h-12 p-2 bg-white rounded-lg md:min-w-56 placeholder-white text-white':!message.messageInfo.messageColor,})}
              ref={inputRef}
              onChange={(e) => { updateMessageText(e.target.value) }}
              value={message?.messageInfo?.messageText}
              placeholder="Type your message here"
              maxLength={255}
              required
            />
            
            <button
              className="w-24 h-12 bg-emerald text-white rounded-lg ml-2 bg-yellow text-white hover:bg-red hover:text-black"
            >
              Send
            </button>
          </form>
        </div>

        <p className="absolute bottom-4 left-4 text-white hidden sm:block">
          Status: {isConnected ? "Connected" : "Disconnected"} - Transport: {transport}
        </p>
      </div>
    </>
  );
}