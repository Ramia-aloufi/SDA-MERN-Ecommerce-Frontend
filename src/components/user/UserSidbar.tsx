import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppDispatch } from '../../redux/store'
import { logOut, userState } from '../../redux/slices/user/UserSlice'
const UserSidbar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { userData } = useSelector(userState)

  function logout() {
    dispatch(logOut())
  }
  return (
    <aside className="h-full z-0 bg-[#434343] text-white border-y border-white flex flex-col items-center justify-evenly p-1">
      <div className="grid">
        <h1 className="font-semibold">Profile</h1>
        <span>{`${userData?.firstName} ${userData?.lastName}`}</span>
        <span></span>
      </div>
      <div className="text-center  flex flex-col gap-7 text-sm">
        <Link to="/admin/users"> Order</Link>
      </div>
      <Link to="/">
        <button className="btn" onClick={logout}>
          Sign Out
        </button>
      </Link>
    </aside>
  )
}
export default UserSidbar
