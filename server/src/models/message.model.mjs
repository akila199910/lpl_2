import mongoose from "mongoose";
const { Schema, Types } = mongoose;

const messageSchema = new Schema({
    conversationId: { type: Types.ObjectId, ref: 'Conversation', required: true },
    senderId: { type: Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  });


export const Message = mongoose.model('Message', messageSchema);
