import LoginForm from "@/components/auth/login-form";

const LoginPage = () => {
    return (
        <div>
           <LoginForm signIn={{
                email: "",
                password: ""
            }}/>
        </div>
    )
}
export default LoginPage;