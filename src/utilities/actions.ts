"use server"
import connectToDb from '../../src/utilities/db';
import { signUpSchema } from './validation';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { Ollama } from "@langchain/community/llms/ollama";
import { ChatOllama } from "@langchain/community/chat_models/ollama";
import {PromptTemplate } from "@langchain/core/prompts";
import axios from 'axios';
import Journal from "@/utilities/models/journalSchema";
import Replicate from "replicate"


const llm = new Ollama({
    baseUrl: "http://localhost:11434", // Default value
    model: "llama2",
  });

const chatModel = new ChatOllama({
    baseUrl: "http://localhost:11434",
    model: "llama2",
  });
  
// export const register = async (data) => {
//     try {
//         await connectToDb();
//         const parsedData = signUpSchema.safeParse(data);

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(data.password, salt);

//         if(!parsedData.success) {
//             throw new Error(parsedData.error.errors[0].message);
//         }
//         const newUser = new User({
//             email: data.email,
//             password: hashedPassword
//         });

//         const savedUser = await newUser.save();
//         console.log(savedUser);

//     } catch(err) {
//         console.log(err);
//     } 
// };

// export const register = async (data)=>{
//     try{
//         const response = await axios.post('/api/register',data)
//         console.log(response)
//     }
//     catch(err){
//         console.log(err)
//     }  
// }


// export const login = async (data)=>{
//     try{
//         await connectToDb();
//         const {username, password} = data;
//         const user = await User.findOne({email: username});
//         if(!user){
//             throw new Error("No User found")
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if(!isMatch){
//             throw new Error("Invalid credentials")
//         }
//         const expires = new Date(Date.now() + 2 * 3600000);
//         const session = await encrypt({user, expires})
//         cookies().set("session", session, { expires, httpOnly: true });
//         return {session,user};
//     }
//     catch(err){
//         console.log(err)
//     }
// }

// export const login = async (data) => {
//     try {
//         await connectToDb();
//         const { username, password } = data
//         const user = await User.findOne({ email: username });
//         if (!user) {
//             throw new Error("No User found")
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             throw new Error("Invalid credentials")
//         }

//         const sessionPayload = { userId: user._id, expires: new Date(Date.now() + 10 * 1000) };
//         const session = await encrypt(sessionPayload);
//         cookies().set("session", session, { httpOnly: true, expires: sessionPayload.expires });
//         // redirect("/")
//        return ({ session, user: { id: user._id, email: user.email } });
//     } catch (err) {
//         console.error(err);
//     }
// };


export const journalSubmit = async (data)=>{
    try{
        await connectToDb();
        const {date, title, journal, insight} = data;
        const newJournal = new Journal({
            date,
            title,
            journal,
            insight
        })
        const saveJournal = await newJournal.save();
        console.log(saveJournal)
    }
    catch(err){
        console.log(err)
    }
}



export const aiJournal = async (journal)=>{
    try{
        const prompt = PromptTemplate.fromTemplate( process.env.AI_PROMPT + ": {journal}");
        const finalPrompt = await prompt.format({
            journal: journal
        })
        const result = await chatModel.invoke(finalPrompt);
        const response = result.content;
        return response;
    }
    catch(err){
        console.log(err)
    }
}



export const findPost = async(id)=>{
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