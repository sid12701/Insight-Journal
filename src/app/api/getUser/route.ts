import connectToDb from "@/utilities/db";
import { getDataFromToken } from "@/utilities/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/utilities/models/userSchema";

connectToDb();

export async function GET( request: NextRequest ) {
    try{
        const userId = getDataFromToken(request)
        const user = await User.findById(userId).select("-password");
        if(!user){
            return NextResponse.json({message:"User not found", success:false})
        }
        return NextResponse.json({data:user})
    }
    catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }
}



