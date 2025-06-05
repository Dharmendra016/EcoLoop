import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  assignedBinId: { type: String, default: null }, // for private bins
  rewardsEarned: { type: Number, default: 0 },
  wasteStats: {
    totalKg: { type: Number, default: 0 },
    breakdown: {
      organic: { type: Number, default: 0 },
      plastic: { type: Number, default: 0 },
      paper: { type: Number, default: 0 },
      metal: { type: Number, default: 0 },
      ewaste: { type: Number, default: 0 },
      glass: { type: Number, default: 0 },
    }
  }
});

export default mongoose.model('User', userSchema);
