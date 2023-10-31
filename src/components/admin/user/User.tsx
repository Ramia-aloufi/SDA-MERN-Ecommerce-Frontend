import { AdminSidbar } from '../AdminSidbar'
import UserLists from './UserLists'

const User = () => {
  return (
    <div className=" h-screen grid grid-cols-[1fr,4fr] ">
      <AdminSidbar />
      <div className="flex flex-col gap-5  overflow-y-scroll p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">User Page</h1>
        </div>
        <UserLists />
      </div>
    </div>
  )
}

export default User
