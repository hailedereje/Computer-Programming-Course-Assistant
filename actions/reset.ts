"use server";
interface FormResponse{
    error?: string,
    success?: string
}
import { getUserByEmail } from "@/data/user";
import { generatePasswordVarificationToken } from "@/lib/tokens";
import { ResetSchema } from "@/schemas/zod-validation";
import { sendPasswordResetEmail } from "@/utils/email";
import * as z from "zod";

export const reset = async (value: z.infer<typeof ResetSchema>): Promise<FormResponse> => {
    
    const validateFields = ResetSchema.safeParse(value);
    
    if(!validateFields.success) return {error: "Email is not valid"};

    const {email} = validateFields.data;
    const existingUser = await getUserByEmail(email);

    if(!existingUser) return {error: "Email not found"}
    try{
        const passwordResetToken = await generatePasswordVarificationToken(email);
    await sendPasswordResetEmail(passwordResetToken.email,passwordResetToken.token);
    return {success: "Reset email sent"}
    }catch{
        return {error: "Email don't sent check your connection"}
    }
    

    
}
