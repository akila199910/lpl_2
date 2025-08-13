import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema({
  player_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true,
  },
  push_time: {
    type: Date,
    default: Date.now, 
  },
  expire_time: {
    type: Date,
    required: true,
    // default: () => new Date(Date.now() + 5 * 60 * 1000),
  },
  status: {
    type: Number,
    enum: [0, 1],
    required: false,
    default: 0
  }
});

auctionSchema.set('toObject', { virtuals: true });
auctionSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Auction', auctionSchema);
