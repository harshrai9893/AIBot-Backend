const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://harshrai05:Harsh14114@cluster1.kopb3q0.mongodb.net/?appName=Cluster1");
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;