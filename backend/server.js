import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
const app = express();
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
app.use(cookieParser());

// import atsRoutes from './routes/atsRoutes.js';
import atsRoute from './routes/atsRoutes.js';
import authRoutes from './routes/authRoute.js';

app.use(cors({
    origin: 'http://localhost:5173', // Vite default port
    credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
// app.use('/api', atsRoutes);
app.use('/api/ats', atsRoute);

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI).then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT,() => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
})