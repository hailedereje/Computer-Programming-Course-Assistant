import { db } from "@/lib/db"
import { VarficationToken } from "@/schemas";


export const getTwoFactorTokenByToken = async(token: string):Promise<VarficationToken|null> =>{
        const ttoken = await db.twoFactorToken.findUnique({where: {token}});
        return ttoken;   
}

export const getTwoFactorTokenByEmail = async(email: string) =>{
    const ttoken = await db.twoFactorToken.findFirst({where: {email}});
    return ttoken;   
}

export const deleteTwoFactorToken = async (id: string) =>{
        await db.twoFactorToken.delete({ where: { id } });
}

export const deleteTwoFactorTokenByToken = async (token: string) =>{
    await db.twoFactorToken.delete({ where: { token } });
}


export const createTwoFactorToken = async (email: string,token: string,expiresAt: Date):Promise<VarficationToken|null> =>{
        const varificationToken = await db.twoFactorToken.create({ 
            data:{
                email,
                token,
                expiresAt
            } 
        });
        return varificationToken;
    
}