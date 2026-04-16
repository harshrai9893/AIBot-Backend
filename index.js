require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

app.use(cors({
  origin: "https://ai-bot-fe-mu.vercel.app",
  credentials: true
}));

app.use(express.json());
app.use("/api", chatRoutes);


connectDB();

app.use("/api", authRoutes);

app.listen(5000, () => console.log("Server running on 5000"));