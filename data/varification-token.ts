"use server";
import { db } from "@/lib/db"

interface VarficationToken{
    id: string 
    email: string 
    token: string 
    expiresAt: Date
  }
export const getVarificationTokenByToken = async (token: string)  =>{
    try{
        const varification = await db.varficationToken.findUnique({ where: { token:token } });
        // console.log(varification)
        return varification;
    }
    catch(error){
        // console.log(error)
        return null;
    }
}

export const getVarificationTokenByEmail = async (email: string) =>{
    try{
        const varificationToken = await db.varficationToken.findFirst({ where: { email } });
        return varificationToken;
    }
    catch{
        return null;
    }
}

export const deleteVarificationToken = async (id: string) =>{
    try{
        await db.varficationToken.delete({ where: { id } });
    }
    catch(error){
        return null;
    }
}

export const createVarificationToken = async (email: string,token: string,expiresAt: Date):Promise<VarficationToken> =>{
    try{
        const varificationToken = await db.varficationToken.create({ 
            data:{
                email,
                token,
                expiresAt
            } 
        });
        return varificationToken;
    }
    catch{
        return null!;
    }
}

