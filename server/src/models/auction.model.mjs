import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema({
    player_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true,
    },

    team_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: false,
    },

    bid_price: {
        type: Number,
        required: true,
    },

    bid_date: {
        type: Date,
        required: true,
    },
    
});

auctionSchema.set('toObject', { virtuals: true });
auctionSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Auction', auctionSchema);
