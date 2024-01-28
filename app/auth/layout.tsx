import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'authentication',
    description: 'user authentication',
  }

const AuthLayout = ({children} : {children:React.ReactNode}) => {
return (
    <div className="min-h-screen p-3 w-full flex items-center justify-center">
        {children}
    </div>
)
}
export default AuthLayout;