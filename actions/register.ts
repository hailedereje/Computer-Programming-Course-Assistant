"use server";
import bcrypt from "bcrypt";

interface LoginResponse{
    success?: string,
    error?: string
}

import { RegisterSchema } from '@/schemas/zod-validation';
import * as z from 'zod';
import { createUser, getUserByEmail } from "@/data/user";
import { generateVarificationToken } from "@/lib/tokens";
import { sendEmail } from "@/utils/email";

export async function register (values : z.infer<typeof RegisterSchema>):Promise<LoginResponse>{
    const validateFields = RegisterSchema.safeParse(values);

    if(!validateFields.success) return {error:"Invalid fields"};

    const {email,password,name} = validateFields.data;
    const hashedPassword = await bcrypt.hash(password,10);
    
    const existingUser = await getUserByEmail(email);

    if(existingUser) return {error: "email already in use!"};
    try{
        await createUser(name,email,hashedPassword);
        const varificationToken = await generateVarificationToken(email);

        try{
            const token = await sendEmail(varificationToken.email,varificationToken.token);
        }catch{
            return {error:"Connection problems try again"}
        }
        
    } catch{
        return {error: "unable to create user!"}
    }
    
    
        
    return {success:`conformation email sent !`}
     
}   