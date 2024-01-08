export interface SignInProps{
    signIn : {
      email : string,
      password: string
    }
}

export interface SignUpProps{
  signUp : {
    email : string,
    password: string,
    name: string  
  }
}

export interface FormErrorProps{
    message?: string
}

export interface ResetProps{
  email: string
}

export interface VarficationToken{
  id: string 
  email: string 
  token: string 
  expiresAt: Date
}