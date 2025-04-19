const mongoose = require('mongoose');

const connectDB = async () => {
  try {
await mongoose.connect('mongodb+srv://yethawi:SarahApril2025@cluster0.ts1lwg1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
