"use server";
import bcrypt from "bcrypt";

interface LoginResponse{
    success?: string,
    error?: string
}

import { RegisterSchema } from '@/schemas/zod-validation';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { db } from "@/lib/db";
import { createUser, getUserByEmail } from "@/data/user";

export async function register (values : z.infer<typeof RegisterSchema>):Promise<LoginResponse>{
    const validateFields = RegisterSchema.safeParse(values);

    if(!validateFields.success) return {error:"Invalid fields"};

    const {email,password,name} = validateFields.data;
    const hashedPassword = await bcrypt.hash(password,10);
    
    const existingUser = await getUserByEmail(email);

    if(existingUser) return {error: "email already in use!"};

    await createUser(name,email,hashedPassword);
    return {success:`User Created`}
     
}   