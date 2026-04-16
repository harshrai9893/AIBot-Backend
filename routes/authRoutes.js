const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../authMiddleware");

const router = express.Router();


// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hash });
    await user.save();

    res.json({ message: "Signup success" });
  } catch {
    res.status(400).json({ error: "User already exists" });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: "Wrong password" });

  const token = jwt.sign(
    { id: user._id, email: user.email },
    "secret123",  
    { expiresIn: "1d" }
  );

  res.json({ token });
});


// PROTECTED ROUTE
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to Dashboard", user: req.user });
});

module.exports = router;