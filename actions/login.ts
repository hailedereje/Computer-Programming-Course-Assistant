"use server";

interface LoginResponse {
    error?: string,
    success?: string,
    twoFactor?: boolean,
    token?: string
}

import { signIn } from '@/auth';

import { compareUserPassword, getUserByEmail } from '@/data/user';
import { generateVarificationToken } from '@/lib/tokens';
import { DEFAULT_LOGIN_REDIRECT_PATH } from '@/route';
import { LoginSchema } from '@/schemas/zod-validation';
import { sendEmailVarification } from '@/utils/email';
import { AuthError } from 'next-auth';
import * as z from 'zod';

export async function login (values : z.infer<typeof LoginSchema> ,url?: any) : Promise<LoginResponse|null>{
    const validateFields = LoginSchema.safeParse(values);

    if(!validateFields.success) return {error:"Invalid fields"}
    const {email,password} = validateFields.data;

    const existingUser = await getUserByEmail(email);
    if(!existingUser || !existingUser.password || !existingUser.email) return {error: "This account doesn't exist !"};
    
    if(!existingUser.emailVerified){
        const varification = await generateVarificationToken(existingUser.email)
        try{
            await sendEmailVarification(email,varification?.token);
        
        }catch{
            return {error:"Connection problems try again"}
        }
        
        return {success: "Confirmation email sent!"}
    }
    const {passwordMatch} = await compareUserPassword(password,existingUser.password);
    if(!passwordMatch) return {error: "invalid credentail"}
   
        try{
           await signIn("credentials",{
                email,
                password,
                redirectTo: url || DEFAULT_LOGIN_REDIRECT_PATH
            });
            
            return {success:"signed in"}

        }catch(error){
            if( error instanceof AuthError){
                switch (error.type) {
                    case "CredentialsSignin":
                        return {error: "Invalid credentials"}
                    default: 
                        return {error: "other type of auth-error"}
            }
        }
    
        throw error;
    }
    

}   
 
