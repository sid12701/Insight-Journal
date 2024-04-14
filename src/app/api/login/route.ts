import connectToDb from "@/utilities/db";
import { NextRequest, NextResponse } from "next/server";
import { signUpSchema } from "@/utilities/validation";
import User  from "@/utilities/models/userSchema";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

connectToDb();

export async function POST (request:NextRequest){
    try{
        const reqBody = await request.json();
        const {email, password} = reqBody;
        const logUser = {
            email,
            password
        }
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({message:"User does not exist", success:false})
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return NextResponse.json({message:"Invalid password", success:false})
        }
        const parsedData = signUpSchema.safeParse(logUser);
        if(!parsedData.success){
            return NextResponse.json({message:parsedData.error.errors[0].message})
        }
        const tokenData = {
            id: user._id,
            email: user.email
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET!,{expiresIn:'1d'});
        const response = NextResponse.json({message:"User logged in successfully", success:true})
        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response
    }
    catch(err:any){
        console.log(err)
        NextResponse.json({error:err.message},{status:500})
    }
}


