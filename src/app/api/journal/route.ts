import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/utilities/getDataFromToken";
import connectToDb from "@/utilities/db";
import Journal from "@/utilities/models/journalSchema";
import User from "@/utilities/models/userSchema";

connectToDb();

export async function POST(request: NextRequest){
    const req = await request.json();
    const userFromToken = getDataFromToken(request);
    // console.log(user.id);
    // console.log(req);
    const {title,date,journal,insight} = req;
    const newJournal = new Journal({
        title,
        date,
        journal,
        insight,
        author:userFromToken.id
    })
    const savedJournal = await newJournal.save();
    
    const user =  await User.findById(userFromToken.id);
    await user.posts.push(savedJournal._id);
    await user.save();
    return NextResponse.json({data: user.id});
} 



