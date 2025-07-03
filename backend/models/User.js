import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  companyName: {
    type: String
  },
  role: {
    type: String,
    enum: ['superAdmin', 'admin', 'teamMember'],
    default: 'teamMember'
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  phoneNumber: {
    type: String
  },
  whatsappNumber: {
    type: String
  },
  plan: {
    type: String,
    enum: ['free', 'trial', 'pro'],
    default: 'trial'
  },
  coinBalance: {
    type: Number,
    default: 10 // trial users start with 10 coins
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  }
});

const User = mongoose.model('User', userSchema);
export default User;