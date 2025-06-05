import mongoose from 'mongoose';

const binSchema = new mongoose.Schema({
  binId: { type: String, unique: true },
  location: {
    lat: Number,
    lng: Number,
  },
  fillLevels: {
    organic: { type: Number, default: 0 },
    plastic: { type: Number, default: 0 },
    paper: { type: Number, default: 0 },
    metal: { type: Number, default: 0 },
    ewaste: { type: Number, default: 0 },
    glass: { type: Number, default: 0 },
  },
  lastSync: { type: Date, default: Date.now },
  isOnline: { type: Boolean, default: true },
  assignedUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
});

export default mongoose.model('Bin', binSchema);
