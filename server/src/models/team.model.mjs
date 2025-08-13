import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true 
      },
    total_contract : { type: Number, required: false, default: 0 },
    total_bids : { type: Number, required: false, default: 0 },
    status: { type: Number, required: true, enum: [0,1,2,3] },
    player_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: false,
        default: null
    }],    
    logo : { type: String, required: false, default: null},
});

teamSchema.set('toObject', { virtuals: true });
teamSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Team', teamSchema);
