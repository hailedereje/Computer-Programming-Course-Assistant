import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas/zod-validation";
import { compareUserPassword, getUserByEmail } from "./data/user";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export default {
    providers: [
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);

                if(validatedFields.success){
                    
                    const {email,password} = validatedFields.data;
                    const user = await getUserByEmail(email);
                    
                    if(!user || !user.password) return null;

                    const {passwordMatch} = await compareUserPassword(password,user.password);
                    if(passwordMatch && user) {
                        return user;
                    }
                    
                }
                return null;
            },
        })
    ]
} satisfies NextAuthConfig