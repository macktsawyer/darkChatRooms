import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    timestamp: { type: String, required: true },
    messageInfo: {
      messageText: { type: String, required: true },
      messageColor: { type: String, required: true },
      isDeleted: { type: Boolean, required: true },
    },
    userInfo: {
      name: { type: String, required: true },
      userid: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);

export default Message;