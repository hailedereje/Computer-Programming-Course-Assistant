import  { type DefaultSession} from "next-auth";

declare module "@auth/core/jwt" {
  interface JWT {
    role?: "ADMIN" | "USER",
    isTwoFactorEnabled: boolean,
    isOAuth: boolean
  }
}

export type ExtendedUser = DefaultSession["user"] & {
    role: "ADMIN" | "USER",
    isTwoFactorEnabled:boolean,
    isOAuth: boolean
}; 

declare module "@auth/core/types" {
    interface Session {
        user: ExtendedUser;
    }
}
