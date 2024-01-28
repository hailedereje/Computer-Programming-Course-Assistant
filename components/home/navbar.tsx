"use client"

import * as React from "react"
import { Binary, ChevronDown, Code, Computer, ComputerIcon, File, LucideIcon, Menu, Phone, Search } from "lucide-react"
import { UserButton } from "../auth/user-button"
import { Button } from "../ui/button"
import { isLoggedIn, useCurrentUser } from "@/hooks/use-current-user"

import { z } from "zod";
import { Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import { useForm } from "react-hook-form"
import { NavbarDropDownSchema } from "@/schemas/zod-validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { IconBadge } from "../icon-bage"
import { LoginComponent } from "../auth/login-component"
import { redirect, usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {  useProfilePageState } from "@/app/state/state"
import Link from "next/link"

export default function Navbar() {

  const [isPending, startTransition] = React.useTransition()
  const user = useCurrentUser();
  const [title, setTitle] = React.useState<string | undefined>("")
  const form = useForm<z.infer<typeof NavbarDropDownSchema>>({
    resolver: zodResolver(NavbarDropDownSchema),
    defaultValues: {title: undefined}});

  const onSubmit = async (value: z.infer<typeof NavbarDropDownSchema>) => {
    console.log({ ...value })
  }
  const router = useRouter();
        const onClick = async () => {
            router.push("/auth/register")
        }
  return (
    <nav className="flex items-center justify-between w-full h-[60px] border-b p-2 bg-white space-x-3">
      <h1>LOGO</h1>
      <div className="relative space-x-5">
        <div className="group hidden xl:block absolute -top-[10px] bottom-0 w-[180px]">
          <div className="flex space-x-3 items-center">
            <p className={`font-semibold text-l`}>
              Explore Courses
            </p>
            <ChevronDown className="w-4 h-4" />
          </div>
          <DropDownMenu />
        </div>
      </div>
      <div className="flex items-center justify-center p-2">
        <p className="font-semibold text-md"> PlayGround </p>
      </div>
      <div className="relative flex flex-col items-center w-[300px]">
        <div className="absolute group h-ful -top-[15px] w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-2 items-center border border-black p-2 rounded-2xl">
              <Search className=" w-5 h-4" />
              <FormField control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input className="outline-none bg-inherit w-[130px]" {...field} onChange={(e) => setTitle(e.target.value)} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <SearchCard title={title!} />
        </div>
      </div>
      <div className="flex items-center justify-between space-x-4">
        {!user && (
          <>
            <LoginComponent asChild>
              <Button size={'sm'} variant={"secondary"}>
                Sign in
              </Button>
          </LoginComponent>
            <Button variant={"blue"} onClick={onClick}>sign up</Button>
          </>
        )}
        {user && (
          <UserButton />
        )}
      </div>
    </nav>
  )
}

const DropDownMenu = () => {

  const dropDownItems: { title: string, icon: LucideIcon,href: string }[] = [
    { title: "Web development", icon: Code,href:"/courses/create" },
    { title: "mobile application", icon: Phone ,href:"/courses/create"},
    { title: "Python", icon: ComputerIcon ,href:"/courses/create"},
    { title: "C++", icon: Binary ,href:"/courses/create"},
    { title: "Machin Learing", icon: File ,href:"/courses/create"}
  ]
  return (
    <div className="bg-white hidden flex-col border-t-0 w-[300px] z-20 group-hover:flex pt-3">
      {dropDownItems.map(item => (
        <div key={item.title} className="flex items-center justify-between w-full hover:bg-slate-300 cursor-pointer p-2">
          <Link href={item.href} className="flex items-center justify-between w-full">
            <div className="flex space-x-2">
            <IconBadge size={"sm"} icon={item.icon} />
            <p className="font-semibold text-sm">
              {item.title}
            </p>
          </div>
          <ChevronDown className="w-4 h-4" />
          </Link>
          
        </div>
      ))}
    </div>
  )
}

const SearchCard = ({ title }: { title: string }) => {
  
  return (
    <div className="hidden flex-col border-t-0 w-full z-20 group-hover:flex pt-3 shadow-sm">
      <div className="flex items-center justify-between w-full h-full p-2 cursor-pointer">
        <div className="flex space-x-2">
          <p className="font-semibold text-sm">
            {!!title ? title : "Search for courses"}
          </p>
        </div>
      </div>
    </div>
  )
}

export const NavLink = ({ title, icon ,href}:{title: string,icon: LucideIcon,href: string}) => {
    const {page,updatePage} = useProfilePageState();
  return (
    <div key={title} className={cn("flex items-center justify-between w-full  cursor-pointer p-2 hover:bg-slate-100",page===href? "border-l-2 border-emerald-600":"")} onClick={()=>updatePage(href)}>
          <div className="flex space-x-2">
            <IconBadge size={"sm"} icon={icon} />
            <p className="font-semibold text-sm">
              {title}
            </p>
          </div>
        </div>
  )
}