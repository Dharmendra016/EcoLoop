import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const router = express.Router();

// Counter schema for auto-incrementing userId
const counterSchema = new mongoose.Schema({
  _id: { type: String },
  seq: { type: Number, default: 0 }
});
const Counter = mongoose.model('Counter', counterSchema);

// User schema
const userSchema = new mongoose.Schema({
  userId: { type: Number, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

// Pre-save middleware to auto-increment userId
userSchema.pre('save', async function (next) {
  if (this.isNew && !this.userId) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'userId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.userId = counter.seq;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

const users = mongoose.model('users', userSchema);

// Register endpoint
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const newUser = new users({ name, email, password, role });
    await newUser.save();

    console.log('User registered:', email, role);

    const redirect =
      role === 'user'
        ? '/userdashboard'
        : role === 'vendor'
        ? '/vendor'
        : '/authority';

    res.status(201).json({ message: 'Registered successfully', redirect, role });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Signin endpoint
router.post('/signin', async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await users.findOne({ email, password, role });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials or role' });
    }

    const redirect =
      role === 'user'
        ? '/userdashboard'
        : role === 'vendor'
        ? '/vendor'
        : '/authority';

    res.status(200).json({ message: 'Login successful', redirect, role });
  } catch (err) {
    console.error('Signin error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user details endpoint
router.get('/details', async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      name: user.name,
      email: user.email
    });
  } catch (err) {
    console.error('Get user details error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
