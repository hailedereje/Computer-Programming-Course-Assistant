"use server";
import { getUserByEmail, varifyUserEmail } from "@/data/user";
import { deleteVarificationToken, getVarificationTokenByToken } from "@/data/varification-token"
import { db } from "@/lib/db";

interface VarificationResponse{
    success?: string|undefined,
    error?: string|undefined
}
export const newVarification = async (token: string) : Promise<VarificationResponse> => {
    
    const existingToken = await  getVarificationTokenByToken(token);
    console.log(existingToken)
    if(existingToken === null){ return {error: "Token doesn't exist"};}
    
    const hasExpired = new Date(existingToken.expiresAt) < new Date();
    if(hasExpired) return {error:"Token has Expried"}
    
    console.log({hasExpired});
    
    const user = await getUserByEmail(existingToken.email);
    if(!user) {return {error: "User doesn't exist"};}

    const varified = await varifyUserEmail(user.id,existingToken.email,existingToken.id);

    return {success: "Email varified!"}
}