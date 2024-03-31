"use client"
import { ChatOllama,ChatPromptTemplate } from "@langchain/community/chat_models/ollama";
import { Ollama } from "@langchain/community/llms/ollama";
import { useState } from "react";

const llm = new Ollama({
    baseUrl: "http://localhost:11434", // Default value
    model: "llama2",
  });

const chatModel = new ChatOllama({
    baseUrl: "http://localhost:11434",
    model: "llama2",
  });
  
  

// const prompt = ChatPromptTemplate.fromMessages([

// ])



const Page = () =>{

    const [res , setRes] = useState("");


    const response = async () =>{
        // chatModel.invoke("Hello").then((response) => {console.log(response)});
        const result = await chatModel.invoke("Hello");
        const response = result.content
        setRes(response)
        console.log(response)
    }
    return (
        <div>
            <button onClick={response} className="bg-black">hello</button>
            <p>{res}</p>
        </div>
    )
}


export default Page