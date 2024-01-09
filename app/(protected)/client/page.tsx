"use client";
import { currentUser } from "@/lib/current-user"
import { UserInfo } from "../_components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

const ClientPage = async () => {
    const user = useCurrentUser();
  return (
    <div>
      <UserInfo user={user} label="📱 Client component"/>
    </div>
  )
}

export default ClientPage