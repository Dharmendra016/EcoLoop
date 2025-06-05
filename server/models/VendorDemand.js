import mongoose from 'mongoose';

const vendorDemandSchema = new mongoose.Schema({
  vendorName: String,
  type: { type: String, enum: ['organic', 'plastic', 'paper', 'metal', 'ewaste', 'glass'] },
  quantity: Number,
  status: { type: String, enum: ['pending', 'fulfilled'], default: 'pending' },
  submittedAt: { type: Date, default: Date.now },
  fulfilledAt: Date
});

export default mongoose.model('VendorDemand', vendorDemandSchema);
