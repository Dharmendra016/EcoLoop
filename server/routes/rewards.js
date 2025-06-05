import express from 'express';
import Reward from '../models/Reward.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { userId, value } = req.body;
    const couponCode = `AURA${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    const reward = await Reward.create({
      userId,
      value,
      couponCode,
      redeemed: true,
      redeemedAt: new Date(),
    });

    res.json({ success: true, couponCode });
  } catch (err) {
    res.status(500).json({ error: 'Reward redemption failed' });
  }
});

export default router;
