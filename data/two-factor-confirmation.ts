import { db } from "@/lib/db"

export const getTwofactorConfirmationById = async(id: string) =>{
    const tconfirmation = await db.twoFactoryConfirmation.findUnique({where: {id}});
    return tconfirmation;
}

export const getTwofactorConfirmationByUserId = async(id: string) =>{
    const tconfirmation = await db.twoFactoryConfirmation.findUnique({where: {userId:id}});
    return tconfirmation;
}

export const deleteTwoFactorConfirmationById = async (id: string) =>{
    await db.twoFactoryConfirmation.delete({ where: { id } }); 
}

export const createTwoFactorConfirmation = async(userId: string) => {
    await db.twoFactoryConfirmation.create({data: {userId}});
}