"use client";
import { SIGN_IN } from "@/route"
import { CardWrapper } from "./card-wrapper"
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVarification } from "@/actions/new-varification";
import { FormError, FormSuccess } from "./form-message";
import {BeatLoader} from "react-spinners"
const VarificationForm = () => {

    const [error,setError] = useState<string|undefined>("");
    const [success,setSuccess] = useState<string|undefined>("");
    const [loader,setLoader] = useState<boolean>(true);

    const searchParams = useSearchParams();
    const token: string = searchParams.get("token") as string;
    
    const onSubmit = useCallback(  ()=>{
            if(!token){ setError("Missing Token"); return;}

            newVarification(token).then(data => {
                  setSuccess(data.success);
                  setError(data.error);
                  setLoader(false);
                }).catch(()=>{
                  setError("something went wrong")
                })

          },[token]);

  useEffect( ()=>  {
      console.log("rendered")
      onSubmit()
    },[onSubmit])
  return (
    <CardWrapper
        headerLabel="Confirming your varification"
        backButtonHref={SIGN_IN}
        backButtonLabel="Back to login"
    >
      <div className="flex items-center w-full justify-center">
        {loader&& (<BeatLoader/>)}
        <FormError message={error}/>
        <FormSuccess message={success}/>
      </div>
    </CardWrapper>
  )  
}

export default VarificationForm