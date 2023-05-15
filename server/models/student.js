import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const studentSchema = new mongoose.Schema({
    first_name: {
        type:String,
        required : [true,"First name is required!"],
    },
    last_name: {
        type:String,
        required : [true,"Last name is required!"],
    },
    email: {
        type:String,
        required : [true,"email is required!"],
        unique: true,
    },
    password: {
        type:String,
        required: [true,"password is required!"],
        minlength: [8,"Password must be atleast 8 characters long"],
        select:false,
    },
    mobile:{
        type:String,
        required: [true,"mobile is required!"],
        length: [10, "Mobile number length should be 10"],
    },
    createdAt: {
        type:Date,
        default:Date.now,
    },
    verified:{
        type: Boolean,
        default: false,
    },
    
    otp: Number,
    otp_expiry: Date,
    resetPasswordOTP: Number,
    resetPasswordExpiry: Date,
});

studentSchema.pre("save", async function (next){
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
})

studentSchema.methods.getJWTToken = function () {
    return jwt.sign({_id:this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000,
    });
}

studentSchema.methods.comparePassword = async function (pwd) {
   return await bcrypt.compare(pwd, this.password);
}

studentSchema.index({otp_expiry:1},{expireAfterSeconds: 0})

export const Student = mongoose.model("Student",studentSchema);