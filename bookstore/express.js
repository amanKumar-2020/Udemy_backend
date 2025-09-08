
import "dotenv/config"
import express from "express"
import booksRouter from "./routes/books.routes.js"
const app = express()
const port = 8000



//middlewere pluging
app.use(express.json());

app.use("/books",booksRouter)
app.listen(port , ()=>console.log(`our server is reunning on  http://localhost:${port}`))