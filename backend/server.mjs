import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from './routes/authRoutes.mjs';
import productRoutes from './routes/productRoutes.mjs';
import cartRoutes from "./routes/cartRoutes.mjs";
import orderRoutes from "./routes/orderRoutes.mjs";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

app.listen(3001, () => console.log("🚀 Server running on port 3001"));
