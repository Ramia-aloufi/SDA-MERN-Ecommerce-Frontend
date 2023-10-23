import { Link } from 'react-router-dom'

export const AdminSidbar = () => {
  return (
    <aside className="h-screen z-0 bg-slate-300 flex flex-col items-center justify-evenly p-1">
      <h1 className="font-semibold">Admin Dashboard</h1>
      <div className="text-center  flex flex-col gap-4 text-sm">
        <Link to="/admin/category"> Category</Link>
        <Link to="/admin/product"> Products</Link>
        <Link to="/admin/users"> Users</Link>
      </div>
      <button>Sign Out</button>
    </aside>
  )
}
