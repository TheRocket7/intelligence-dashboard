const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/ask", async (req, res) => {
  const { prompt, instruction } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: instruction,
        },
        { role: "user", content: prompt },
      ],
    });

    res.json({ result: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to connect to OpenAI" });
  }
});

app.use("/api/data", require("./routes/dataRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/logs", require("./routes/logRoutes"));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
