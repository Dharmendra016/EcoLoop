import mongoose from 'mongoose';

const rewardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  value: Number,
  redeemed: { type: Boolean, default: false },
  couponCode: String,
  redeemedAt: Date,
});

export default mongoose.model('Reward', rewardSchema);
