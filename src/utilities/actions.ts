"use server"
import connectToDb from '../../src/utilities/db';
import { signUpSchema } from './validation';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { User, Journal } from './schema';
import { Ollama } from "@langchain/community/llms/ollama";
import { ChatOllama } from "@langchain/community/chat_models/ollama";
import {PromptTemplate } from "@langchain/core/prompts";


const llm = new Ollama({
    baseUrl: "http://localhost:11434", // Default value
    model: "llama2",
  });

const chatModel = new ChatOllama({
    baseUrl: "http://localhost:11434",
    model: "llama2",
  });
  


export const register = async (data) => {
    try {
        await connectToDb();
        const parsedData = signUpSchema.safeParse(data);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);

        if(!parsedData.success) {
            throw new Error(parsedData.error.errors[0].message);
        }
        const newUser = new User({
            email: data.email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

    } catch(err) {
        console.log(err);
    } 
};

export const login = async (data)=>{
    try{
        await connectToDb();
        const {username, password} = data;
        const user = await User.findOne({email: username});
        if(!user){
            throw new Error("No User found")
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new Error("Invalid credentials")
        }
        console.log("Logged in")
    }
    catch(err){
        console.log(err)
    }
}

export const journalSubmit = async (data)=>{
    try{
        await connectToDb();
        const journal = new Journal({
            
        })
    }
    catch(err){
        console.log(err)
    }
}



export const aiJournal = async (journal)=>{
    try{
        const prompt = PromptTemplate.fromTemplate("You are a helpful jorunalling assistant that helps convert the journal entries from a user into an insightful version of the journal, Here is the journal that you have to produce insights from : {journal}");
        const finalPrompt = await prompt.format({
            journal: journal
        })
        const result = await chatModel.invoke(finalPrompt);
        const response = result.content;
        console.log(response);
        return response;
    }
    catch(err){
        console.log(err)
    }
}