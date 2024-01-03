import { db } from "@/lib/db"
import bcrypt from "bcryptjs";

export const createUser = async(name: string,email: string,password: string) => {
    
    const user = await db.user.create({ data: { name,email,password } })
}
export const getUserByEmail = async(email : string) => {

    const user = await db.user.findUnique({ where: { email } });
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
