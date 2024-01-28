import { settings } from "@/actions/settings";
import { FormError, FormSuccess } from "@/components/auth/form-message";
import { Button } from "@/components/ui/button";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import { SettingsSchema } from "@/schemas/zod-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRole } from "@prisma/client";
import { List, Loader2Icon, PersonStanding } from "lucide-react";

import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const ProfileUpdateForm = ({page}:{page: string}) => {

    const user = useCurrentUser();
    const form = useForm<z.infer<typeof SettingsSchema>>({
      resolver: zodResolver(SettingsSchema),
      defaultValues: {
        name: user?.name || undefined,
        email: user?.email || undefined,
        password: undefined,
      }
    })
  
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
  
    const [isPending, startTransition] = useTransition();
    const { update } = useSession();
  
    const { isValid } = form.formState;
    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
  
      setError("");
      setSuccess("")
  
      startTransition(() => {
        settings(values).then((data) => {
          if (data.success) {
            update();
            setSuccess(data.success);
          }
  
          if (data.error) setError(data.error);
        }).catch((error) => setError("something went wrong"))
      })
    }
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={cn("col-span-2 grid grid-cols-2 grid-flow-row gap-10", page === "profile" ? "" : "hidden")}>
          
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="john doe"
                      disabled={isPending} name="name" className="w-full" />
                  </FormControl>
                </FormItem>
              )}
            />
  
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="john@gmail.com"
                      disabled={isPending} name="email" className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
    
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="******"
                      disabled={isPending} name="password" className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="*****"
                      disabled={isPending} name="newPassword" className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending } variant="default" type="submit" size={"sm"} className={cn("w-[200px] justify-self-center")}>
            {isPending && <span className="mr-4"><Loader2Icon className="h-4 w-4 animate-spin" /></span>}
            save
          </Button>
        </form>
      </Form>
    )
  }