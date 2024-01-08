import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string({required_error: "Email Field Required"}).email(),
    password: z.string({required_error: "Password Field Required"}).min(1,{message:'Password field required'}),
    code: z.optional(z.string())
  });

  export const RegisterSchema = z.object({
    email: z.string({required_error: "Email Field Required"}).email(),
    password: z.string({required_error: "Password Field Required"}).min(5,{message:'Password field required'}).refine(d => !d.includes(" "),{message:"invalid password remove whitespace"}),
    name: z.string({required_error:"name is required"}).min(3,{message: "name must be atleast 3 chars long"}).trim().refine(d => !d.includes(" "),{message:"invalid name"})
  });

  export const ResetSchema = z.object({
    email: z.string({required_error: "Email Field Required"}).email(),
  });

  export const PasswordResetSchema = z.object({
    password: z.string({required_error: "Password field required"}).min(5,{message: "min of 6 charactors required"}),
  });

  export const TwoFactorSchema = z.object({
    code: z.string().length(6,{message: "The code is 6 charactors long"})
  })

