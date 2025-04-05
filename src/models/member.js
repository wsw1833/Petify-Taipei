// models/reminder.js
import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: [true, 'Please provide wallet address'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  nullifier_hash: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Member || mongoose.model('Member', memberSchema);
