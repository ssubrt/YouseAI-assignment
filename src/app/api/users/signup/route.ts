import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";




 



export async function POST(request:NextRequest){
     await connect();
    try {

        const reqBody = await request.json();
        const {name,email,password}  = reqBody

        console.log(reqBody);

        //check if user is exists 
        const user  = await User.findOne({email});

        if(user){
           
            return NextResponse.json({
                error:"User Already Exist try Login ",
               
            },{
               
                status:400
            })
           
        }


        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hasedPassword = await bcryptjs.hash(password,salt)

        const newUser = new User({
            name,
            email,
            password: hasedPassword
        })

        const savedUser = await newUser.save();
        console.log(savedUser);

         // Generate JWT token using savedUser
         const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET!);


        return NextResponse.json({
            message:"User created successfully",
            success:true,
            savedUser,
            token
            
        })



        
    } catch (error:any) {
        return NextResponse.json({
            error: error.message
        },
        {
            status:500
        })
         
    }
}