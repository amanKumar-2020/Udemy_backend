import express from "express";

const PORT = process.env.PORT ?? 8000;
const app = express();   // <-- call express()

app.get("/", (req, res) => {
  res.send("Hello, world! 🚀");
});

app.listen(PORT, () => {
  console.log(`Our server is running on http://localhost:${PORT}`);
});
