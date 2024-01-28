import  { type DefaultSession} from "next-auth";

declare module "@auth/core/jwt" {
  interface JWT {
    role?: "ADMIN" | "USER" | "INSTRUCTOR",
    isOAuth: boolean
  }
}

export type ExtendedUser = DefaultSession["user"] & {
    role: "ADMIN" | "USER" | "INSTRUCTOR",
}; 

declare module "@auth/core/types" {
    interface Session {
        user: ExtendedUser;
    }
}
