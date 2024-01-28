import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Metadata } from "next";
import Navbar from "@/components/home/navbar";

export const metadata: Metadata = {
    title: 'main',
    description: 'main page',
  }

const ProtectedPageLayout = async ({children} : {children:React.ReactNode}) => {
    const session = await auth();

    return (
        <SessionProvider session={session}>
            <div className="s">
                {children}
            </div>
        </SessionProvider>
    )
    }
    export default ProtectedPageLayout;