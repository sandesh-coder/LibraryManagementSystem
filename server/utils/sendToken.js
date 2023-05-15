export const sendToken = (res, student, statusCode, message) =>{
    
    const token = student.getJWTToken();

    const options = {
        httpOnly: true,
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
    }
    
    const studentData = {
        _id: student._id,
        name: `${student.first_name +` `+ student.last_name}`,
        email: student.email,
        mobile: student.mobile,
        verified: student.verified,
    }


    res.status(statusCode)
    .cookie("token",token,options)
    .json({ success: true,message: message, user: studentData });
}