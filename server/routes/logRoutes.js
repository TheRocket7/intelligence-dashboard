const express = require("express");
const { readJSON, writeJSON } = require("../utils");
const router = express.Router();

router.post("/", (req, res) => {
  const logs = readJSON("log.json");
  const newLog = { ...req.body, time: new Date().toISOString() };
  logs.push(newLog);
  writeJSON("log.json", logs);
  res.json(newLog);
});

router.get("/", (req, res) => {
  const logs = readJSON("log.json");
  res.json(logs);
});

module.exports = router;
