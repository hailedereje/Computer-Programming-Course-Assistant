"use client";

import { settings } from "@/actions/settings";
import { FormError, FormSuccess } from "@/components/auth/form-message";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import { SettingsSchema } from "@/schemas/zod-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRole } from "@prisma/client";
import { Loader2Icon } from "lucide-react";

import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SettingsPage = () => {

  const user = useCurrentUser();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined
    }
  })

  const [error,setError] = useState<string|undefined>();
  const [success,setSuccess] = useState<string|undefined>();

  const [isPending,startTransition] = useTransition();
  const {update} = useSession();

  const {isValid} = form.formState;
  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    
    setError("");
    setSuccess("")
   
    startTransition(() => {
      settings(values).then((data)=> {
        if(data.success){
          update();
          setSuccess(data.success);
        }

        if(data.error) setError(data.error);
      }).catch((error)=> setError("something went wrong"))
    })
  }

 
  return (
    <Card className="md:w-[600px] w-[500px] shadow-md">
    <CardHeader>
        <p className="text-2xl font-semibold text-center">⚙️ Settings</p>
    </CardHeader>
    <CardContent className="space-y-4">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field}) =>(
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="john doe"
                            disabled={isPending} name="name"/>
                      </FormControl>
                    </FormItem>
                  )}
                />

                 {!user?.isOAuth &&
                  <>
                  <FormField
                  control={form.control}
                  name="email"
                  render={({ field}) =>(
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="john@gmail.com"
                            disabled={isPending} name="email"/>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field}) =>(
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="******"
                            disabled={isPending} name="password"/>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field}) =>(
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="*****"
                            disabled={isPending} name="newPassword"/>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                </>
                
               }

                 <FormField
                  control={form.control}
                  name="role"
                  render={({ field}) =>(
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}> 
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role"/>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={UserRole.USER}>User</SelectItem>
                            <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                          </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                {!user?.isOAuth && (
                      <FormField
                        control={form.control}
                        name="isTwoFactorEnabled"
                        render={({ field}) =>(
                          <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                              <div className="space-y-0.5">
                                <FormLabel>Enable 2FA authentication</FormLabel>
                                <FormDescription>Enable two factor authentication for your account</FormDescription>
                              </div>
                              <FormControl>
                                <Switch disabled={isPending} checked={field.value} onCheckedChange={field.onChange}/>
                              </FormControl>
                          </FormItem>
                        )}
                      />)
                }
              <FormError message={error}/>
              <FormSuccess message={success}/>
              <Button disabled={isPending && isValid} variant="blue" type="submit" size={"sm"} className={cn(isValid ? "":"cursor-not-allowed")}>
                  {isPending && <span className="mr-4"><Loader2Icon className="h-4 w-4 animate-spin"/></span>}
                  save
              </Button> 
            </form>
        </Form>
    </CardContent>
</Card>
  )
}

export default SettingsPage

