// backend/routes/bin.js
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

const binSchema = new mongoose.Schema({
  binId: { type: String, required: true, unique: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Bin = mongoose.model('bins', binSchema);

// Add a new bin
router.post('/add', async (req, res) => {
  const { binId, latitude, longitude } = req.body;

  console.log('Request body:', req.body);  // <--- add this

  if (!binId || latitude == null || longitude == null) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newBin = new Bin({ binId, latitude, longitude });
    await newBin.save();
    res.status(201).json({ message: 'Bin added successfully' });
  } catch (error) {
    console.error('Error adding bin:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
