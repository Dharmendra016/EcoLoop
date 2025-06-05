import express from 'express';
import VendorDemand from '../models/VendorDemand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { vendorName, type, quantity } = req.body;
    const demand = await VendorDemand.create({ vendorName, type, quantity });
    res.json(demand);
  } catch (err) {
    res.status(500).json({ error: 'Demand submission failed' });
  }
});

router.get('/', async (req, res) => {
  const demands = await VendorDemand.find();
  res.json(demands);
});

export default router;
