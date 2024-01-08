import { createPasswordResetToken, deletePasswordResetToken, getPasswordResetTokenByEmail } from "@/data/password-reset";
import { createVarificationToken, deleteVarificationToken, getVarificationTokenByEmail } from "@/data/varification-token";
import { VarficationToken } from "@/schemas";
import {v4 as uuidv4} from "uuid";
import crypto from "crypto";
import { createTwoFactorToken, deleteTwoFactorToken, getTwoFactorTokenByEmail } from "@/data/two-factor-token";

export const generateTwoFactorToken = async (email: string): Promise<VarficationToken> =>{
    const token = crypto.randomInt(100_000,1_000_000).toString();
    const expires = new Date(new Date().getTime() + 3600*1000);
    const existingToken = await getTwoFactorTokenByEmail(email);

    if(existingToken) await deleteTwoFactorToken(existingToken.id);

    const ttoken = await createTwoFactorToken(email,token,expires);
    return ttoken!;
}

export const generateVarificationToken  = async (email: string): Promise<VarficationToken> => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600*1000);//1-hour

    const existingToken = await getVarificationTokenByEmail(email);
    if(existingToken)  await deleteVarificationToken(existingToken.id);

    const varficationToken = await createVarificationToken(email,token,expires);
   
    return varficationToken!;
}

export const generatePasswordVarificationToken = async (email: string): Promise<VarficationToken> =>{
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600*1000);

    const existingToken = await getPasswordResetTokenByEmail(email);
    if(existingToken) await deletePasswordResetToken(existingToken.id);

    const passwordResetToken = await createPasswordResetToken(email,token,expires);

    return passwordResetToken;
}

