import connectToDb from "@/utilities/db";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";



export async function POST (request:NextRequest){
    try{
        const reqBody = await request.json();
        const {journal} = reqBody;
        const apiUrl = "https://api.cloudflare.com/client/v4/accounts/a00c7ddc4e7892feccde514c721419bc/ai/run/@cf/meta-llama/llama-2-7b-chat-hf-lora";
        const prompt = process.env.AI_PROMPT + ": " + journal;
        const aiBearerToken = process.env.AI_BEARER_TOKEN;
        try {
            const result = await axios.post(apiUrl, {prompt: prompt}, {
                headers: {
                    Authorization: `Bearer ${aiBearerToken}`,
                }
            });
            return NextResponse.json({data: result.data})
        } catch (err) {
            console.error(err);
        }
    }
    catch(err){
        console.log(err)
    }
}
