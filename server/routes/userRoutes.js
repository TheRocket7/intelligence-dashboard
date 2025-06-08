const express = require("express");
const { readJSON } = require("../utils");
const router = express.Router();

router.post("/login", (req, res) => {
  const users = readJSON("users.json");
  const user = users.find(
    (u) => u.username === req.body.username && u.password === req.body.password
  );
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  res.json({ message: "Login successful", user });
});

module.exports = router;
