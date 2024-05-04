"use server"
import connectToDb from '../../src/utilities/db';
import axios from 'axios';
import Journal from "@/utilities/models/journalSchema";




export const aiCloudflare = async (journal: string) => {
    const apiUrl = "https://api.cloudflare.com/client/v4/accounts/a00c7ddc4e7892feccde514c721419bc/ai/run/@cf/meta-llama/llama-2-7b-chat-hf-lora";
    const prompt = process.env.AI_PROMPT + ": " + journal;
    const aiBearerToken = process.env.AI_BEARER_TOKEN;
    try {
        const result = await axios.post(apiUrl, {prompt: prompt}, {
            headers: {
                Authorization: `Bearer ${aiBearerToken}`,
            }
        });
        return result.data
    } catch (err) {
        console.error(err);
    }
}



export const findPost = async(id : string)=>{
    try{
        await connectToDb();
        const journal = await Journal.findById(id)
        const journalObject = journal.toObject();
        return { 
            ...journalObject, 
            _id: journalObject._id.toString(), 
            author: { 
              ...journalObject.author, 
              buffer: journalObject.author.buffer.toString(), 
              date: new Date(journalObject.date).toISOString()
            } 
          };
    }
    catch(err){
        console.log(err)
    }
}