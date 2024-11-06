// Load environment variables
require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            appName: "Melano-bag-store",
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        //console.error(`Error: ${error.message}`);
        console.log(error);
        //process.exit(1);
    }
};

module.exports = connectDB;
