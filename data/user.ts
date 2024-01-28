import { db } from "@/lib/db"
import bcrypt from "bcryptjs";
import { deleteVarificationToken } from "./varification-token";
import { deletePasswordResetToken } from "./password-reset";
import { User } from "@prisma/client";

export const createUser = async(name: string,email: string,password: string) => {
        try{
                await db.user.create({ data: { name,email,password } })
        }catch{
            return null!;
        }
     
}
export const getUserByEmail = async(email : string):Promise<User> => {
        try{
             const user = await db.user.findFirst({ where: { email } });
             return user!;   
        }catch{
                return null!;
        }
                
}

export const getUserById = async(id : string) => {
        try{
            return await db.user.findUnique({ where: { id } });
        }catch{
             return null!;
        }
        
}

export const compareUserPassword = async(password: string,hashedPassword: string) =>{
        try{
             const passwordMatch = await bcrypt.compare(password,hashedPassword);
             return {passwordMatch};
        }catch{
             return null!;
        }
    
}

export const varifyUserEmail = async(id: string,email: string,tokenId: string) =>{
    
        await db.user.update({
            where: {id},
            data: {
                emailVerified: new Date(),
                email }})
        await deleteVarificationToken(tokenId);
    
}

export const resetPassword = async (id: string,password: string,tokenId: string) =>{
        const hashedPassword =await bcrypt.hash(password,10)
        await db.user.update({where: {id},data:{password: hashedPassword}} );
        await deletePasswordResetToken(tokenId)
        
}