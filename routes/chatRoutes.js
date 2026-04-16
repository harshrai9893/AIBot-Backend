 const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");
const authMiddleware = require("../authMiddleware"); 
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);



router.post("/chat",authMiddleware, async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.id; // from JWT middleware

    const model = genAI.getGenerativeModel({
      model:  "gemini-3-flash-preview" });

    const result = await model.generateContent(message);
    const response = await result.response;
    const reply = response.text();

    //  Find existing chat or create new
    let chat = await Chat.findOne({ userId });

    if (!chat) {
      chat = new Chat({ userId, messages: [] });
    }

    // Add user + bot messages
    chat.messages.push(
      { text: message, sender: "user" },
      { text: reply, sender: "bot" }
    );

    await chat.save();

    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Chat error" });
  }
});

router.get("/chat-history", async (req, res) => {
  try {
    const userId = req.user.id;

    const chat = await Chat.findOne({ userId });

    if (!chat) {
      return res.json({ messages: [] });
    }

    res.json({ messages: chat.messages });

  } catch (err) {
    res.status(500).json({ error: "Error fetching chat" });
  }
});

module.exports = router;