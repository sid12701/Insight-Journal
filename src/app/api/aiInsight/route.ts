import connectToDb from "@/utilities/db";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";



export async function POST (request:NextRequest){
    try{
        const req = await request.json();
        const {journal} = req;
        const aiBearerToken = process.env.AI_BEARER_TOKEN;
        const prompt = process.env.AI_PROMPT + ": " + journal
        const response = await axios.post("https://api.cloudflare.com/client/v4/accounts/a00c7ddc4e7892feccde514c721419bc/ai/run/@cf/meta-llama/llama-2-7b-chat-hf-lora",{prompt: prompt},{
            headers: {
                Authorization: `Bearer ${aiBearerToken}`,
            }
        })
        return NextResponse.json({data: response.data})
    }
    catch(err){
        console.log(err)
    }
}
