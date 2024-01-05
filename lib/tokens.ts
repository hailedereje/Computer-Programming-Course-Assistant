import { createPasswordResetToken, deletePasswordResetToken, getPasswordResetTokenByEmail } from "@/data/password-reset";
import { createVarificationToken, deleteVarificationToken, getVarificationTokenByEmail } from "@/data/varification-token";
import { VarficationToken } from "@prisma/client";
import {v4 as uuidv4} from "uuid";

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

