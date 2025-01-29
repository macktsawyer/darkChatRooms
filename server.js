import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { connectToDatabase } from "./utils/mongodb.js"; 
import Message from "./models/Message.js"; 

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

import "dotenv/config";

mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  serverSelectionTimeoutMS: 5000, // Adjust the timeout value if needed
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit the process if the DB connection fails
});

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("A user connected");

      socket.on("message", async (msg) => {
        console.log("Message received:", msg);

        if (!msg?.messageInfo?.messageText) {
          console.error("Error: Message text is required.");
          return;
        }

        try {
          await connectToDatabase();
          const newMessage = new Message({
            id: msg?.id,
            timestamp: msg?.timestamp,
            messageInfo: {
              messageText: msg?.messageInfo?.messageText,
              messageColor: msg?.messageInfo?.messageColor,
              isDeleted: msg?.messageInfo?.isDeleted,
            },
            userInfo: {
              name: msg.userInfo.name,
              userid: msg.userInfo.userid,
            }
          });
          await newMessage.save();
          console.log("Message saved to database.");
          io.emit("message", msg); // Emit to all connected clients

        } catch (error) {
          console.error("Error saving message to database: ", error);
        }

      });

      socket.on("disconnect", () => {
        console.log("A user disconnected");
      });

      socket.on('getChatHistory', async () => {
        try {
          // Find all messages from the database
          const messages = await Message.find()
            .sort({ timestamp: 1 }) // Sort messages by timestamp in ascending order
            .exec();
  
          // Emit the messages to the connected user
          socket.emit('messageHistory', messages);
        } catch (error) {
          console.error('Error fetching message history:', error);
        }
      });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});