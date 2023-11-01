import { AdminSidbar } from '../components/admin/AdminSidbar'
// import { NewProductWrapper } from '../components/admin/product/NewProductWrapper'

export const AddNewProduct = () => {
  return (
    <div className="h-screen grid grid-cols-[1fr,4fr] ">
      <AdminSidbar />
      {/* <NewProductWrapper /> */}
    </div>
  )
}
