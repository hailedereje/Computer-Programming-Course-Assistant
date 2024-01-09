import { currentUser } from "@/lib/current-user"
import { UserInfo } from "../_components/user-info";

const ServerPage = async () => {
    const user = await currentUser();
  return (
    <div>
      <UserInfo user={user} label="💻 Server component"/>
    </div>
  )
}

export default ServerPage