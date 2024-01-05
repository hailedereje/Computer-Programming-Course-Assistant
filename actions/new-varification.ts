"use server";
import { getPasswordResetTokenByToken } from "@/data/password-reset";
import { getUserByEmail, resetPassword, varifyUserEmail } from "@/data/user";
import {  getVarificationTokenByToken } from "@/data/varification-token"
import { PasswordResetSchema } from "@/schemas/zod-validation";
import { z } from "zod";

interface VarificationResponse{
    success?: string|undefined,
    error?: string|undefined
}
export const newVarification = async (token: string) : Promise<VarificationResponse> => {
 
    const existingToken = await  getVarificationTokenByToken(token);

    if(existingToken === null){ return {error: "Token doesn't exist"};}
    
    const hasExpired = new Date(existingToken.expiresAt) < new Date();
    if(hasExpired) return {error:"Token has Expried"}
    
    console.log({hasExpired});
    
    const user = await getUserByEmail(existingToken.email);
    if(!user) {return {error: "User doesn't exist"};}

    const varified = await varifyUserEmail(user.id,existingToken.email,existingToken.id);

    return {success: "Email varified!"}
   
}

export const newPasswordVarification = async(token: string,value: z.infer<typeof PasswordResetSchema>): Promise<VarificationResponse> =>{
    const validateFields = PasswordResetSchema.safeParse(value);
    if(!validateFields.success) return {error: "In valid fields"}

    const existingToken = await  getPasswordResetTokenByToken(token);

    if(!existingToken){ return {error: "password reset Token doesn't exist"};}
    
    const hasExpired = new Date(existingToken.expiresAt) < new Date();
    if(hasExpired) return {error:"password reset Token has Expried"}
    
    console.log({hasExpired});
    
    const user = await getUserByEmail(existingToken.email);
    if(!user) {return {error: "User doesn't exist"};}
    
    const {password} = validateFields.data;
    
    const varified = await resetPassword(user.id,password,existingToken.id);

    return {success: "password reseted successfully!"}
}