import RegisterForm from "@/components/auth/register-form";

const SignUpPage = () => {
    return (
        <div className="">
            <RegisterForm signUp={{email:"",password:"",name:""}}/>
        </div>
    )
}
export default SignUpPage;