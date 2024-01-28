import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import Navbar from '@/components/home/navbar'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'

import { EdgeStoreProvider } from '../lib/edgestore';
// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Auth',
  description: 'Nextjs v5 auth implementation',
}

export default async function RootLayout({children}: {children: React.ReactNode}) {

  const session = await auth();
  return (
    <html lang="en">
      <body className="">
      <SessionProvider session={session}>
        <div className="min-h-screen flex flex-col space-y-4">
          <Navbar/>
          <EdgeStoreProvider>
            {children}
          </EdgeStoreProvider>
          
        </div> 
        <Toaster/>
        </SessionProvider>
      </body>

    </html>
  )
}
