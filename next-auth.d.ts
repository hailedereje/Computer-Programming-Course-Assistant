import { type DefaultSession} from "next-auth";

declare module "@auth/core/jwt" {
  interface JWT {
    role?: "ADMIN" | "USER"
  }
}

export type ExtendedUser = DefaultSession["user"] & {role: "ADMIN" | "USER"};

declare module "@auth/core/types" {
    interface Session {
        user: ExtendedUser;
    }
}
