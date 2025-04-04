import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true 
  },
  profileImageUrl: {
    type: String,
    required: false
  }
}, { timestamps: true });

export default mongoose.model('UserProfile', userProfileSchema);
