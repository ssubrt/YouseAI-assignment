import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Provide a username'],
        unique:true
    },
    email:{
        type:String,
        required:[true,'Please Provide a valid email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please Provide a password'],
        minlength:[4,'Password should be at least 4 characters long']
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,

})

const User  = mongoose.models.users || mongoose.model("users",userSchema);

export default User;