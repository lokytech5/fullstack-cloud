import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://mongo-db:27017/playDB?authSource=admin&replicaSet=rs0");
        console.log('Connected to MongoDB...');
    } catch (error) {
        console.log("Could not connect to Mongodb", error);
        process.exit(1);    
    }
}

export default connectDB;