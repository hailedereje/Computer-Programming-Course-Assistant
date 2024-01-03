"use client";
import Image from "next/image";
import signupImage from "@/public/signup-image.jpg";
import googleIcon from "@/public/icons8-google.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { redirect, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { NextResponse } from "next/server";
import { useTransition } from "react";
import { Loader2Icon } from "lucide-react";



interface SignInProps{
    signIn : {
      email : string,
      password: string
    }
}

const signInSchema = z.object({
  email: z.string({required_error: "Email Field Required"}).email(),
  password: z.string({required_error: "Password Field Required"})
})


const page = ({signIn} : SignInProps) => {
    
  const router = useRouter();
  const {toast} = useToast();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: signIn
  })

  const [isPending,startTransition] = useTransition();
  
  const {isSubmitting,isValid} = form.formState;

  const onSubmit = async (values : z.infer<typeof signInSchema>) => {
      const login = async(url: string) => {
        const loginInfo : NextResponse= await axios.post(url,values);
        console.log(loginInfo.status)
        router.refresh();
      }

      const url = "https://courseassistant.vercel.app/api/v1/auth/login";
      startTransition(() =>login(url));
      
  }

  return (
    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-white max-h-[1920px] max-w-6xl border-2 rounded-xl">
        <div className="flex flex-col gap-6 p-10">
          <div className="flex flex-col items-start gap-7 justify-between p-5">
            <div className="flex flex-col">
              <p className="text-2xl font-bold">Welcome Back! 👋</p>
              <p className="text-sm text-gray-400">
                login to your account to access latest features
              </p>
            </div>
            <Button variant={"outline"} className="rounded-full w-full">
              <Image
                src={googleIcon}
                alt="google icon"
                className="h-4 w-4 mr-2"
              />
              SignIn with Google
            </Button>
            <div className="flex gap-5 items-center justify-center w-full">
              <hr className="hidden border w-1/4 md:block" />
              <p className="text-sm text-black">or signin with email</p>
              <hr className="hidden border w-1/4 md:block" />
            </div>
            <div className="flex w-full flex-col">
              <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4 mt-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                      <FormItem>
                        <FormControl>
                          <Input autoComplete="email" placeholder="haile@gmail.com" className="rounded-full w-full" {...field}/>
                        </FormControl>
                        <FormMessage className=" ml-5 text-xs lowercase animate-pulse"/>
                      </FormItem>
                    )}/>

                  <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                      <FormItem>
                        <FormControl>
                          <Input autoComplete="password" placeholder="use strong password" type="password" className="rounded-full w-full" {...field}/>
                        </FormControl>
                        <FormMessage className=" ml-5 text-xs lowercase animate-pulse"/>
                      </FormItem>
                    )}/>
                    <Button type="submit" variant={"blue"}>
                    {isPending && <span className="mr-4"><Loader2Icon className="h-4 w-4 animate-spin"/></span>} Login
                    </Button>
                </form>
              </Form>  
            </div>
          </div>
        </div>
        <div className="hidden md:flex">
          <Image
            src={signupImage}
            width={450}
            height={400}
            alt="signup"
            className="object-contain"
          />
        </div>
      </div>
  );
};

export default page;

