import {z} from "zod";


export const signUpSchema = z.object({
    email:z.string().email({message:"Invalid email"}),
    password: z.string().min(8, {message:"Password must be at least 8 characters long"}),   
})



export const loginSchema = z.object({
    email:z.string().email({message:"Invalid email"}),
    password: z.string().min(8, {message:"Invalid password"}),
})