import mongoose from 'mongoose';

const wasteDropSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  binId: { type: String },
  item: String,
  type: { type: String, enum: ['organic', 'plastic', 'paper', 'metal', 'ewaste', 'glass'] },
  weight: Number,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('WasteDrop', wasteDropSchema);
