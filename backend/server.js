import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import messageRouter from './routes/message.routes.js';

import { connectMongoDB } from './db/db.connect.js';

dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express()

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter)
app.use("/api/messages", messageRouter)
app.use("/api/users", userRouter)

app.listen(PORT, () => {
    connectMongoDB();
    console.log(`Server is running on PORT ${PORT}`);    
});