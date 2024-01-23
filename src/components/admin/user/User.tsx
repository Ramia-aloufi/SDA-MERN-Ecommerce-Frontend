import AdminSidbar from '../AdminSidbar'
import UserLists from './UserLists'

const User = () => {
  return (
    <div className=" h-screen grid md:grid-cols-[1fr,4fr] xs:grid-cols-[1fr,2fr] ">
      <AdminSidbar />
      <div className="flex flex-col gap-5  overflow-y-scroll p-6">
        <div className="flex items-center justify-between">
          <h1 className="md:text-2xl xs:text-xl font-bold">User Page</h1>
        </div>
        <UserLists />
      </div>
    </div>
  )
}

export default User
