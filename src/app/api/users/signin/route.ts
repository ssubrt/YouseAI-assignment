import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken";


connect();





export async function POST(request:NextRequest){
    

    try {

        const reqBody = await request.json();
        const {email,password}  = reqBody

        console.log(reqBody);

        //NOTE:check if user is not exist  
        const user  = await User.findOne({email});

        if(!user){
            return NextResponse.json({
                error:"User Not Exist try Signup first "
            },{
                status:400
            })
        }


       //INFO: Check if password is correct or not

       const validPassword = await bcryptjs.compare(password,user.password);

       if(!validPassword){
        return NextResponse.json(
            {
            error:"Invalid PAssword",
            },{
            status: 400
            })
       }

       //NOTE:Create token data

       const tokenData = {
        id: user._id,
        name:user.name,
        email:user.email
       }

       //INFO: create token
       const token = await jwt.sign(tokenData,process.env.JWT_SECRET!);
      

       const response = NextResponse.json({
        message:"Login Successfully",
        success:true
       });


       response.cookies.set("token",token,{
        httpOnly:true,
       });
;
       return response

       
       


        
    } catch (error:any) {
        return NextResponse.json({
            error: error.message
            
        },
        {
            status:500
        })
         
    }
}