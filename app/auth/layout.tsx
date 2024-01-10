import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'authentication',
    description: 'user authentication',
  }

const AuthLayout = ({children} : {children:React.ReactNode}) => {
return (
    <div>
        {children}
    </div>
)
}
export default AuthLayout;