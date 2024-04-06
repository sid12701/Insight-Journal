import { getDataFromToken } from "@/utilities/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../utilities/models/userSchema";
import Journal from "../../../utilities/models/journalSchema"


export async function GET(request : NextRequest){
    const userId= getDataFromToken(request).id
    const user = await User.findById(userId)
    const postIds = user?.posts
    const posts = await Journal.find({_id: {$in: postIds}})
    console.log(posts)
    return NextResponse.json({data:posts})
}
