// models/provider.js
import mongoose from 'mongoose';

const providerSchema = new mongoose.Schema({
  petId: {
    type: String,
    required: [true, 'Please provide petId'],
  },
  name: {
    type: String,
    required: [true, 'Please state the name'],
  },
  walletAddress: {
    type: String,
    required: [true, 'Please state the wallet Address'],
  },
  location: {
    type: String,
    required: [true, 'Please state the working location'],
  },
  txHash: {
    type: String,
    required: true,
  },
  chainNetwork: {
    type: String,
    required: true,
  },
  AddedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Provider ||
  mongoose.model('Provider', providerSchema);
