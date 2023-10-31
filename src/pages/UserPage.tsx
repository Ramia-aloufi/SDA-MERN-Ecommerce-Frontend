import UserSidbar from '../components/user/UserSidbar'

const UserPage = () => {
  return (
    <div className="grid grid-cols-[1fr,3fr]">
      <UserSidbar />
      <h1 className="h-screen">Admin bage</h1>
    </div>
  )
}

export default UserPage
