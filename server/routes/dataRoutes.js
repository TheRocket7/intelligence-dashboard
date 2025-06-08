const express = require("express");
const { readJSON, writeJSON } = require("../utils");
const router = express.Router();

router.get("/", (req, res) => {
  const data = readJSON("data.json");
  res.json(data);
});

router.post("/", (req, res) => {
  const all = readJSON("data.json");
  const newItem = { id: Date.now(), ...req.body };
  all.push(newItem);
  writeJSON("data.json", all);
  res.json(newItem);
});

router.post("/bulk", (req, res) => {
  writeJSON("data.json", req.body);
  res.json(req.body);
});

router.put("/:id", (req, res) => {
  let all = readJSON("data.json");
  const index = all.findIndex((i) => i.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Not found" });
  all[index] = { ...all[index], ...req.body };
  writeJSON("data.json", all);
  res.json(all[index]);
});

router.delete("/:id", (req, res) => {
  let all = readJSON("data.json");
  all = all.filter((i) => i.id != req.params.id);
  writeJSON("data.json", all);
  res.json({ success: true });
});

router.get("/search", (req, res) => {
  const query = req.query.q?.toString().toLowerCase();
  const data = readJSON("data.json");
  console.log("query", query);

  if (!query) {
    return res.status(400).json({ error: 'Search query "q" is required' });
  }

  const results = data.filter((item) =>
    item.title?.toLowerCase().includes(query)
  );

  res.json(results);
});

module.exports = router;
