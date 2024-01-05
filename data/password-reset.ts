import { db } from "@/lib/db"

interface ResetToken{
    id: string 
    email: string 
    token: string 
    expiresAt: Date
  }
export const getPasswordResetTokenByToken = async (token: string): Promise<ResetToken|null> => {
    try{
        const passwordToken = await db.passwordResetToken.findUnique({
            where: {
                token
            }
        });

        return passwordToken;

    }catch{
        return null;
    }
}

export const getPasswordResetTokenByEmail = async (email: string): Promise<ResetToken|null> => {
    try{
        const passwordToken = await db.passwordResetToken.findFirst({
            where: {
                email
            }
        });

        return passwordToken;

    }catch{
        return null;
    }
}

export const createPasswordResetToken = async(email: string,token: string,expires: Date): Promise<ResetToken> => {
    try{
        const passwordToken = await db.passwordResetToken.create({
            data:{
                email,
                token,
                expiresAt: expires
            }
        })
        return passwordToken;
    }catch{
        return null!;
    }
}

export const deletePasswordResetToken = async(id: string) =>{
    try{
        await db.passwordResetToken.delete({
            where: {
                id
            }
        })
    }catch{
        return null;
    }
}

