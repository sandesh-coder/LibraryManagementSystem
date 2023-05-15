import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import Student from "./routes/Student.js"

export const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors());

app.use("/student",Student);

app.get("/",(req,res)=>{
    res.send("Server is working");
})