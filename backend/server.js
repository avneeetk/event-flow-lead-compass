import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contacts.js';
import followupRoutes from './routes/followups.js';
import coinRoutes from './routes/coins.js';
import aiRoutes from './routes/ai.js';
dotenv.config();
const app = express();

// CORS setup
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route endpoints
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/followups', followupRoutes);
app.use('/api/coins', coinRoutes);
app.use('/api/ai', aiRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));