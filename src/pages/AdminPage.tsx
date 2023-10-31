import { AdminSidbar } from '../components/admin/AdminSidbar'

export const AdminPage = () => {
  return (
    <div className=" h-screen grid grid-cols-[1fr,3fr]">
      <AdminSidbar />
      <h1 className="">Admin bage</h1>
    </div>
  )
}
