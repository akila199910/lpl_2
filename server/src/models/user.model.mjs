import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    contactNumber: {
    type: String,
    required: true,
    unique: true,
    },
    name: { type: String, required: true },
    status: { type: Number, required: true, enum: [0, 1, 2, 3, 4, 5, 6] },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    country: { type: String, required: true },
    role: { type: String, required: true },
    verifyOtp: { type: String, default: '' },
    verifyOtpExpireAt: { type: Number, default: 0 },
    isAccountVerified: { type: Boolean, default: false },
    resetOtp : { type: String, default: '' },
    resetOtpExpireAt: { type: Number, default: 0 },
}, { timestamps: true });

userSchema.virtual('profile', {
    ref: 'UserProfile',
    localField: '_id',
    foreignField: 'user',
    justOne: true
  });

  // userSchema.virtual('bids', {
  //   ref: 'Bid',
  //   localField: '_id',
  //   foreignField: 'user',
  //   justOne: false
  // });
  
  // userSchema.virtual('team', {
  //   ref: 'Team',
  //   localField: '_id',
  //   foreignField: 'user',
  //   justOne: true
  // });
  
  userSchema.set('toObject', { virtuals: true });
  userSchema.set('toJSON', { virtuals: true });
  

export default mongoose.model('User', userSchema);
