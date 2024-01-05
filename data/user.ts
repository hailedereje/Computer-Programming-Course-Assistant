import { db } from "@/lib/db"
import bcrypt from "bcryptjs";
import { deleteVarificationToken } from "./varification-token";

export const createUser = async(name: string,email: string,password: string) => {
    
    const user = await db.user.create({ data: { name,email,password } })
}
export const getUserByEmail = async(email : string) => {

    const user = await db.user.findFirst({ where: { email } });
    if(!user) return null;
    return user;
    
}

export const getUserById = async(id : string) => {
    const user = await db.user.findUnique({ where: { id } });
    if(!user) return null;
    return user;
   
}

export const compareUserPassword = async(password: string,hashedPassword: string) =>{
    const passwordMatch = await bcrypt.compare(password,hashedPassword);
    return {passwordMatch};
}

export const varifyUserEmail = async(id: string,email: string,tokenId: string) =>{
    try{
        await db.user.update({
            where: {id},
            data: {
                emailVerified: new Date(),
                email }})
        await deleteVarificationToken(tokenId);
    }catch {
        return null;
    }
}