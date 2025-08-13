import mongoose from "mongoose";
const { Schema, Types } = mongoose;

const conversationSchema = new Schema({

  participants: [
    { type: Types.ObjectId, ref: 'User', required: true }
  ],
  
  lastMessageAt: { type: Date, default: null }
}, { timestamps: true });


export const Conversation = mongoose.model('Conversation', conversationSchema);
