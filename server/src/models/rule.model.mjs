import mongoose from "mongoose";

const ruleSchema = new mongoose.Schema({
    contract_cost: { type: Number, required: true },
    bid_cost: { type: Number, required: true },
    total_players_in_team : { type: Number, required: true, default: 0 },
    total_contract_players : { type: Number, required: false, default: 0 },
    auction_time_limit : { type: Number, required: true },
    auction_start_date : { type: Date, required: true },
});

ruleSchema.set('toObject', { virtuals: true });
ruleSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Rule', ruleSchema);
