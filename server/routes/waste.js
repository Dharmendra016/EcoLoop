import express from 'express';
import WasteDrop from '../models/WasteDrop.js';
import User from '../models/User.js';
import Bin from '../models/Bin.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { userId, binId, item, type, weight } = req.body;

    // Save waste drop log
    const drop = await WasteDrop.create({ userId, binId, item, type, weight });

    // Update bin fill level
    const bin = await Bin.findOne({ binId });
    if (bin) {
      bin.fillLevels[type] += weight;
      bin.lastSync = new Date();
      await bin.save();
    }

    // Update user stats
    const user = await User.findById(userId);
    if (user) {
      user.wasteStats.totalKg += weight;
      user.wasteStats.breakdown[type] += weight;
      user.rewardsEarned += weight * 0.5; // Rs. 2 per kg
      await user.save();
    }

    res.status(201).json({ message: 'Waste logged and stats updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
