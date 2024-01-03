"use client"
import { Button } from "@/components/ui/button"
import { UsePageState } from "./state"



export const LoadingButton = () => {
    const {setLoading,isLoading} = UsePageState();
  
    return (
        <Button onClick={() => setLoading()}>
            Loading
        </Button>
    )
}

export const Loading = () => {
    const {isLoading} = UsePageState();
    return (
        <>{isLoading && <p>page is loading</p>}</>
        
    )
}