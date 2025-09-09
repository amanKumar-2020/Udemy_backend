
import express from "express";

const app = express();
const PORT = 8000;
app.use(express.json());

const DAIRY = {};
const EMAILS = new Set();

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
    if (EMAILS.has(email)) {
    return res.status(400).json({
      message: "Email has already taken",
    });
  }
  // creating a token for user
  const token = `${Date.now()}`;
  //entry in dairy
  DAIRY[token] = {name , email ,password}
  EMAILS.add(email);

  return res.json({ status:"success" , token})
});

app.post("/me",(req,res)=>{
  const {token} =req.body;
  if(!token){
    return res.status(400).json({ error:"missing token" })
  }
  if (!(token in DAIRY)){
    return res.status(400).json({error:"Token is incorrect"})
  }
  const entry = DAIRY[token]
  return res.json({data:entry})
})

app.listen(PORT, () => {
  console.log("our app is listening on port 8000");
});
