import express from "express";
import { usersTable } from "../db/schema.js";
import db from "../db/index.js"

import { eq } from "drizzle-orm";

import { randomBytes, createHmac } from "node:crypto";
import { table } from "node:console";

const router = express.Router();

router.get('/',async (req,res)=>{
  return res.status(200).json({
    message:`user route is also running`
  })
})

router.post("/signup", async (req, res) => {
  const { name, password, email } = req.body;

  const [exitingUser] = await db
    .select({ email: usersTable.email })
    .from(usersTable)
    .where((table) => eq(table.email, email));
  
  if (exitingUser) {
    return res
      .status(400)
      .json({ message: `user with email ${email} already exist` });
  }
  const salt = randomBytes(16).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");
    
  const [user] = await db
    .insert(usersTable)
    .values({ name, email, password: hashedPassword, salt })
    .returning({ id: usersTable.id });

  return res.status(201).json({
    status:"success" , data: {userId: user.id}
  })

});

// router.post("/login",async (req,res)=>{
//   const { password, email } = req.body;
//   const [exitingUser] =await db
//   .select()
//   .from(usersTable)
//   .where((table)=> eq())

// })

export default router;
