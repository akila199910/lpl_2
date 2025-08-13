import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './src/models/user.model.mjs'
import UserProfile from './src/models/userProfile.model.mjs';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/lpl';

const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const existing = await User.findOne({ email: 'akeeumayanga7775@gmail.com' });
    if (existing) {
      console.log('⚠️ Admin already exists');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('Akila@1999', 10);

    const admin = await User.create({
      firstName: 'Akila',
      lastName: 'Mayanga',
      name: 'Akila Mayanga',
      contactNumber: '0770000000',
      email: 'akeeumayanga7775@gmail.com',
      password: hashedPassword,
      status: 1,
      country: 'Sri Lanka',
      role: 'Admin',
      isAccountVerified: true
    });

    await UserProfile.create({
      user: admin._id,
      profileImageUrl: 'admin.png'
    });

    console.log('✅ Admin seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to seed admin:', error);
    process.exit(1);
  }
};

seedAdmin();
