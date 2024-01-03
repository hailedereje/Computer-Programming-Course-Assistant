"use server";

interface LoginResponse {
    error?: string,
    success?: string
}

import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT_PATH } from '@/route';
import { LoginSchema } from '@/schemas/zod-validation';
import { AuthError } from 'next-auth';
import * as z from 'zod';

export async function login (values : z.infer<typeof LoginSchema> ) : Promise<LoginResponse>{
    const validateFields = LoginSchema.safeParse(values);

    if(!validateFields.success) return {error:"Invalid fields"}
    const {email,password} = validateFields.data;

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