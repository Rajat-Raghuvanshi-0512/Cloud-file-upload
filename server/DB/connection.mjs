import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        const isConnected = await mongoose.connect(process.env.MONGO_URI)
        isConnected && console.log(`Connected to Database 🔥`);
    } catch (error) {
        console.log(error.message);
    }
}

export default connectToDB;