// config/db.js
const mongoose = require("mongoose");

// Set strictQuery explicitly to suppress the warning
//mongoose.set('strictQuery', true);

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://user1:Daswani123@cluster0.hhvl7hk.mongodb.net/taskmanager?retryWrites=true&w=majority&appName=Cluster0");  // Remove deprecated options
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
