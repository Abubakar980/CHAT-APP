import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes.js';
import mongoose from 'mongoose';
import { connectMongoDB } from './db/db.connect.js';

const PORT = process.env.PORT || 8000;
const app = express()

dotenv.config();
app.use(express.json());

app.use("/api/auth", authRouter)

app.listen(PORT, () => {
    connectMongoDB();
    console.log(`Server is running on PORT ${PORT}`);    
});