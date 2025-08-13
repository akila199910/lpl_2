import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
    auction_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auction',
        required: true,
    },

    player_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true,
      },

    bid_value: {
        type : Number,
        required: true
    },
    
    team_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true,
    },
    
});

bidSchema.set('toObject', { virtuals: true });
bidSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Bid', bidSchema);
