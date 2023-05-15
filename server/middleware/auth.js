import jwt from "jsonwebtoken";
import { Student } from "../models/student.js";



export const isAuthenticated = async (req, res, next) => {
    try {

        const { token } = req.cookies;

        console.log(token);

        if (!token) {
            return res.status(401).json({success: false, message: "Login first"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.student = await Student.findById(decoded._id);
        next()
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}