"use client"
// import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LoginComponent } from '@/components/auth/login-component';
import axios from 'axios';

// const font = Poppins({
//   subsets:["latin"],
//   weight:["600"]
// })
// const url = "/api"
// const sendMail = async ()=>{
//   const res = await axios.post(url)
// }

export default function Home() {
  return (
    <main className="flex full flex-col items-center justify-center  bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6 text-center">
        <h1 className={cn("text-6xl font-semibold text-white drop-shadow-md",/**font.className**/)}>
        🔐 Auth
        </h1>
        <p className="text-white text-lg">
          A simple authetication service
        </p>
        <div>
          <LoginComponent asChild>
            <Button size={'lg'} variant={"secondary"}>
              Sign in
          </Button>
          </LoginComponent>
          
        </div>
      </div>

    </main>
  )
}



