"use server"
import { signIn } from "@/auth"
import { createTwoFactorConfirmation, deleteTwoFactorConfirmationById, getTwofactorConfirmationByUserId } from "@/data/two-factor-confirmation"
import { deleteTwoFactorToken, deleteTwoFactorTokenByToken } from "@/data/two-factor-token"
import { getUserByEmail, getUserById } from "@/data/user"
import { db } from "@/lib/db"
import { DEFAULT_LOGIN_REDIRECT_PATH } from "@/route"
import { TwoFactorSchema } from "@/schemas/zod-validation"
import { AuthError } from "next-auth"
import { z } from "zod"

interface LoginResponse {
    error?: string,
    success?: string,
    twoFactor?: boolean
}

export const twoFactorLogin = async (value: z.infer<typeof TwoFactorSchema>,token: string): Promise<LoginResponse> => {
    const validateFields = TwoFactorSchema.safeParse(value);
    if(!validateFields.success) return {error: "invalid fields"};

    const {code} = validateFields.data;
    const confirmationCode = await db.twoFactorToken.findUnique({where: {token: code}});
    
    const user = await getUserById(token);

    if(!user) return {error: "user not found"};
    if(!confirmationCode) return {error: "Invalid confirmation code"};

    if(confirmationCode.token !== code) return {error: "invalid code"};

    const hasEx = confirmationCode.expiresAt < new Date();
    if(hasEx) return {error: "Code has expired"};

    const codeOwner = await getUserByEmail(confirmationCode.email);
    if(!codeOwner) return {error: "Invalid code"};
    
    const confirmation = await getTwofactorConfirmationByUserId(user.id);
    if(confirmation) await deleteTwoFactorConfirmationById(confirmation.id);

    await deleteTwoFactorTokenByToken(code);
    await createTwoFactorConfirmation(token);
    
    const {email,password} = user;
    
    await signIn("credentials",{
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT_PATH
        });
        
        return {success:"signed in"}   
 }

   




