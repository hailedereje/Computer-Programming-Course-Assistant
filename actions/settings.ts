"use server";

import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { generateVarificationToken } from "@/lib/tokens";
import { SettingsSchema } from "@/schemas/zod-validation";
import { sendEmailVarification } from "@/utils/email";
import { z } from "zod";
import bcrypt from "bcryptjs"

export const settings = async(values: z.infer<typeof SettingsSchema>) =>{
    const user = await currentUser();
    if(!user) return {error:"Unauthorized"}

    const dbUser = await getUserById(user.id);
    if(!dbUser) return {error:"Unauthorized"}

    if(user.isOAuth){
        values.email = undefined;
        values.password = undefined;
        values.newPassword =undefined;
        values.isTwoFactorEnabled = undefined;
    }

     if(values.email && values.email !== user.email) {
        const exUser = await getUserByEmail(values.email);
        if(exUser && exUser.id !== user.id){
            return {error: "Email already in use"};
        }
         
        const varification = await generateVarificationToken(values.email);
        await db.user.update({where: {id: dbUser.id},data: {email:values.email,emailVerified:null}})
        try{
            await sendEmailVarification(varification.email,varification.token);
            return {success: "varification email sent"}
        }catch{
            return {error: "something went wrong at server action"}
        }
         
     }

     if(values.password && values.newPassword && dbUser.password){
        const match = await bcrypt.compare(values.password,dbUser.password)
        if(!match) return {error: "the old password is not correct !"};

        const hashedPassword = await bcrypt.hash(values.newPassword,10);
        values.password = hashedPassword;
     }

    
    await db.user.update({where: {id: dbUser.id},data:{
        name: values.name,
        email: values.email,
        password:values.password,
        isTwoFactorEnabled:values.isTwoFactorEnabled,
        role: values.role,
        emailVerified: values.emailVarified
    }});
     
    return {success: "settings updated"}
}