import express from "express";
import userRouter from "./routes/user.route.js";
const PORT = process.env.PORT ?? 8000;
const app = express();  
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello,hai world! 🚀");
});

app.use("/user", userRouter);



app.listen(PORT, () => {
  console.log(`Our server is running on http://localhost:${PORT}`);
});
