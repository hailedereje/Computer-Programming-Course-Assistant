"use server";

interface LoginResponse {
    error?: string,
    success?: string
}

import { signIn } from '@/auth';
import { getUserByEmail } from '@/data/user';
import { generateVarificationToken } from '@/lib/tokens';
import { DEFAULT_LOGIN_REDIRECT_PATH } from '@/route';
import { LoginSchema } from '@/schemas/zod-validation';
import { sendEmail } from '@/utils/email';
import { AuthError } from 'next-auth';
import * as z from 'zod';

export async function login (values : z.infer<typeof LoginSchema> ) : Promise<LoginResponse>{
    const validateFields = LoginSchema.safeParse(values);

    if(!validateFields.success) return {error:"Invalid fields"}
    const {email,password} = validateFields.data;

    const existingUser = await getUserByEmail(email);
    if(!existingUser || !existingUser.password || !existingUser.email) return {error: "This account doesn't exist !"};
    
    if(!existingUser.emailVerified){
        const varification = await generateVarificationToken(existingUser.email)
        try{
            await sendEmail(email,varification?.token);
        
        }catch{
            return {error:"Connection problems try again"}
        }
        
        return {success: "Confirmation email sent!"}
    }
    try{
        await signIn("credentials",{
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT_PATH
        });
        return {success:"signed in"}
    }catch(error){
        if( error instanceof AuthError){
            switch (error.type) {
                case "CredentialsSignin":
                    return {error: "Invalid credentials"}
                default: 
                    return {error: "something went wrong!"}
            }
        }
        throw error;
    }

}   
 
export const socialLogin = async (provider : "google" | "github") => {
    await signIn(provider,{
        redirectTo:DEFAULT_LOGIN_REDIRECT_PATH
    })
}