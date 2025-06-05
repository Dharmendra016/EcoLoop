import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import wasteRoutes from "./routes/waste.js";
import userRoutes from "./routes/users.js";
import binRoutes from "./routes/bins.js";
import rewardRoutes from "./routes/rewards.js";
import vendorRoutes from "./routes/vendors.js";

// Load env vars
dotenv.config();

// Connect to DB
connectDB();


// Initialize app BEFORE you use it
const app = express();
app.use(cors());
app.use(express.json());

// Register routes
app.use("/api/waste", wasteRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bins", binRoutes);
app.use("/api/rewards", rewardRoutes);
app.use("/api/vendors", vendorRoutes);

// Root test route
app.get("/", (req, res) => {
  res.send("AuraSort Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
