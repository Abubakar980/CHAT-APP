import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes.js';
import mongoose from 'mongoose';
import { connectMongoDB } from './db/db.connect.js';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 8000;
const app = express()

dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter)
app.use

app.listen(PORT, () => {
    connectMongoDB();
    console.log(`Server is running on PORT ${PORT}`);    
});