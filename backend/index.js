import express from "express";
import dotenv from "dotenv"
import cors from 'cors';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import multer from "multer";

import authRoute from "./routes/auth.js"
import postRoute from "./routes/posts.js"
import userRoute from "./routes/users.js"

dotenv.config();
const app= express();
app.use(cors({
  origin: 'http://localhost:5173', // Update with your client domain
  credentials: true,
}));


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.status(200).json(file.filename);
});

app.use("/api/auth",authRoute)
app.use("/api/posts",postRoute)
app.use("/api/users",userRoute)

app.listen(process.env.PORT , ()=> console.log(`Server is running on PORT: ${process.env.PORT}`));



