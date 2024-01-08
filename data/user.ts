import { db } from "@/lib/db"
import bcrypt from "bcryptjs";
import { deleteVarificationToken } from "./varification-token";
import { deletePasswordResetToken } from "./password-reset";
import { User } from "@prisma/client";

export const createUser = async(name: string,email: string,password: string) => {
    
     await db.user.create({ data: { name,email,password } })
}
export const getUserByEmail = async(email : string):Promise<User> => {
        const user = await db.user.findFirst({ where: { email } });
        return user!;        
}

export const getUserById = async(id : string) => {
        return await db.user.findUnique({ where: { id } });
}

export const compareUserPassword = async(password: string,hashedPassword: string) =>{
    const passwordMatch = await bcrypt.compare(password,hashedPassword);
    return {passwordMatch};
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