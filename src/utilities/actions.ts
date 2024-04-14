"use server"
import connectToDb from '../../src/utilities/db';
import {PromptTemplate } from "@langchain/core/prompts";
import axios from 'axios';
import Journal from "@/utilities/models/journalSchema";



// export const aiJournal = async (journal : string)=>{
//     try{
//         const prompt = PromptTemplate.fromTemplate( process.env.AI_PROMPT + ": {journal}");
//         const finalPrompt = await prompt.format({
//             journal: journal
//         })
//         const result = await chatModel.invoke(finalPrompt);
//         const response = result.content;
//         return response;
//     }
//     catch(err){
//         console.log(err)
//     }
// }



export const aiCloudflare = async (journal: string) => {
    const apiUrl = "https://api.cloudflare.com/client/v4/accounts/a00c7ddc4e7892feccde514c721419bc/ai/run/@cf/meta-llama/llama-2-7b-chat-hf-lora";
    const prompt = process.env.AI_PROMPT + ": " + journal;
    const aiBearerToken = "bq_YqEf9LsCjI_QphsQeUH8UO_vWTk4MOxXdNZ58"
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