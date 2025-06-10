import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log(`Connected to MongoDB at ${process.env.MONGO_DB_URI}`);
        
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error.message}`);
    }
}