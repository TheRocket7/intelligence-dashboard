const fs = require("fs");
const path = require("path");

const readJSON = (filename) => {
  const filePath = path.join(__dirname, "data", filename);
  const data = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf-8")
    : "[]";
  return JSON.parse(data);
};

const writeJSON = (filename, data) => {
  const filePath = path.join(__dirname, "data", filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

module.exports = { readJSON, writeJSON };
