import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import Navbar from "./_components/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'main',
    description: 'main page',
  }

const ProtectedPageLayout = async ({children} : {children:React.ReactNode}) => {
    const session = await auth();

    return (
        <SessionProvider session={session}>
            <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center">
                <Navbar/>
                {children}
            </div>
        </SessionProvider>
    )
    }
    export default ProtectedPageLayout;