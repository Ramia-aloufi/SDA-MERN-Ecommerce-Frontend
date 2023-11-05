import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { IoPersonCircleOutline, IoLogOutOutline } from 'react-icons/io5'

import { AppDispatch } from '../../redux/store'
import { logOut, userState } from '../../redux/slices/user/userSlice'

export const AdminSidbar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { userData } = useSelector(userState)
  function logout() {
    dispatch(logOut())
  }
  return (
    <aside className="h-full z-0 bg-[#434343] text-white border-y border-white flex flex-col items-center justify-evenly p-1">
      <Link to="/admin">
        <div className="grid place-items-center">
          <h1 className="font-semibold mb-4">Admin Dashboard</h1>
          <IoPersonCircleOutline className="text-[90px]" />
          <span>{userData?.firstName}</span>
        </div>
      </Link>
      <div className="text-center  flex flex-col gap-7 text-sm">
        <Link to="/admin/category"> Category</Link>
        <Link to="/admin/product"> Products</Link>
        <Link to="/admin/order"> Order</Link>
        <Link to="/admin/users"> Users</Link>
      </div>
      <Link to="/">
        <button className="btn flex justify-center items-center gap-2" onClick={logout}>
          Sign Out <IoLogOutOutline className="text-lg" />
        </button>
      </Link>
    </aside>
  )
}
