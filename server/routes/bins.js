import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Define the Bin schema
const binSchema = new mongoose.Schema({
  binId: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  binUserId: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// Create the Bin model
const Bin = mongoose.model('bin', binSchema);

// GET all bins
router.get('/', async (req, res) => {
  try {
    const bins = await Bin.find();
    res.json(bins);
  } catch (error) {
    console.error('Error fetching bins:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST to add a new bin
router.post('/add', async (req, res) => {
  const { binId, location, binUserId } = req.body;

  if (!binId || !location || !binUserId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existing = await Bin.findOne({ binId });
    if (existing) {
      return res.status(409).json({ message: 'Bin ID already exists' });
    }

    const newBin = new Bin({ binId, location, binUserId });
    await newBin.save();

    res.status(201).json({ message: 'Bin added successfully' });
  } catch (error) {
    console.error('Error adding bin:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
