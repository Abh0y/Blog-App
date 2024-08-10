import { db } from "../database/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = (req,res) => {
  try {
    if(!req.body.password || req.body.password.length < 6) {
      return res.status(400).json('Password must be at least 6 characters long.');
    }

    const q="SELECT * FROM users WHERE username = ? OR email = ?"

    db.query(q,[req.body.username,req.body.email],(err,data)=>{
      if (err) return res.status(500).json({ error: err.message });
      if (data.length) return res.status(409).json("User already exists!");

      const salt =bcrypt.genSaltSync(10);
      const hash =bcrypt.hashSync(req.body.password,salt);

      const randomNumber = Math.floor(Math.random() * 100) + 1;
      const img="https://avatar.iran.liara.run/public/randomNumber";

      const q ="INSERT INTO users(username,email,password,image) VALUES(?,?,?,?)"

      db.query(q,[req.body.username,req.body.email,hash,img],(err,data)=> {
        if (err) return res.status(500).json({ error: err.message });
        return res.status(201).json({ message: "User has been created" });
      })

    }) 
  } catch (error) {
    console.error("Error in signup controller", error.message);
    return res.status(500).json("Signup Failed");
  }

} 


export const login =  (req,res)=> {
  try {
    const q = "SELECT * FROM users WHERE username = ?"
    db.query(q,req.body.username, (err, data)=>{
      if(err) return res.json(err);
      if(data.length == 0) return res.status(404).json("User not found");

      const isPasswordCorrect =bcrypt.compareSync(req.body.password,data[0].password)

      if(!isPasswordCorrect) return res.status(400).json("Invalid Username or Password")

      const token =jwt.sign({id:data[0].id},"iduniquekey")
      const {password,...other} = data[0];
      res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'strict', // Adjust as needed: 'lax' or 'none' for cross-site requests
      }).status(200).json(other);

    })
  } catch (error) {
    console.error("Error in login controller", error.message);
    return res.status(500).json("Login Failed");
  }

}

export const logout =async (req,res)=> {
  res.clearCookie("access_token",{
    sameSite:"none",
    secure : true
  }).status(200).json("User logged out!")
}