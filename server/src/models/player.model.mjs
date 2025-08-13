import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    team_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: false,
    },

    batting_style: {
        type: Number,
        enum: [0, 1], // 0 = Left-handed, 1 = Right-handed
        required: false
        },

    bowling_style: { 
        type: Number, 
        enum: [0,1,2,3,4,5,6,7,8,9], 
        required: false 
        },

    batting_average: { type: Number, required: false , default: null},
    bowling_average: { type: Number, required: false , default: null},
    batting_strike_rate: { type: Number, required: false, default: null},
    bowling_strike_rate: { type: Number, required: false, default: null},
    batting_high_score: { type: Number, required: false, default: null },
    batting_runs: { type: Number, required: false , default: null},    
    bowling_wickets: { type: Number, required: false , default: null},
    bowling_economy: { type: Number, required: false , default: null},
    number_of_matches: { type: Number, required: false , default: null},
    number_of_innings: { type: Number, required: false , default: null},
    number_of_hundreds: { type: Number, required: false , default: null},
    number_of_fifties: { type: Number, required: false , default: null},
    number_of_catches: { type: Number, required: false , default: null},
    number_of_stumpings: { type: Number, required: false , default: null},
    status: { type: Number, required: false, enum: [0,1,2,3,4,5,6], default: 0 },
    base_price:{ type: Number, required:false, default:10000 }
});

playerSchema.set('toObject', { virtuals: true });
playerSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Player', playerSchema);
