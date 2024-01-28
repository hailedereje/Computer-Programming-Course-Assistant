import { useRouter } from 'next/navigation';
import React from 'react'
interface RedirectingButtonProps{
    children: React.ReactNode,
    path: string
}
const RedirectingButton = ({children,path}: RedirectingButtonProps) => {
    const router = useRouter();
    const onClick = async () => {
        router.push(path)
    }
    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}

export default RedirectingButton