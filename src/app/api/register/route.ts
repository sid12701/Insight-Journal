import connectToDb from "@/utilities/db";
import { NextRequest, NextResponse } from "next/server";
import { signUpSchema } from "@/utilities/validation";
import User  from "@/utilities/models/userSchema";
import bcrypt from 'bcrypt';

connectToDb();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    // console.log(reqBody)
    const {email, password} = reqBody;
    const newUser = {
        email,
        password
    }
    console.log(newUser);
    const parsedData = signUpSchema.safeParse(newUser);
    if (!parsedData.success) {
      console.log(parsedData.error.errors[0].message);
      return NextResponse.json({ message: parsedData.error.errors[0].message });
    }
    const user = await User.findOne({email})
    if(user){
        return NextResponse.json({message:"User already exists", success:false})
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const signUpUser = new User({ email, password:hashedPassword });
    const savedUser = await signUpUser.save();
    console.log(savedUser);
    return NextResponse.json({message:"User Created Successfully", success:true, savedUser})
  } catch (err:any) {
    console.log(err);
    return NextResponse.json({error:err.message},{status:500})
  }
}
