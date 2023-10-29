import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppDispatch } from '../../redux/store'
import { logOut } from '../../redux/slices/user/UserSlice'

export const AdminSidbar = () => {
  const dispatch = useDispatch<AppDispatch>()
  function logout() {
    dispatch(logOut())
  }
  return (
    <aside className="h-full z-0 bg-slate-300 flex flex-col items-center justify-evenly p-1">
      <h1 className="font-semibold">Admin Dashboard</h1>
      <div className="text-center  flex flex-col gap-7 text-sm">
        <Link to="/admin/category"> Category</Link>
        <Link to="/admin/product"> Products</Link>
        <Link to="/admin/order"> Order</Link>
        <Link to="/admin/users"> Users</Link>
      </div>
      <Link to="/">
        <button onClick={logout}>Sign Out</button>
      </Link>
    </aside>
  )
}
