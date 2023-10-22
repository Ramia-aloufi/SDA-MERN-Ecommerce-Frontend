import { Link } from 'react-router-dom'
import { AdminSidbar } from '../AdminSidbar'
import { ProductsTable } from './ProductsTable'

export const Products = () => {
  return (
    <div className=" h-screen grid grid-cols-[1fr,4fr] ">
      <AdminSidbar />
      <div className="flex flex-col gap-5 text-center overflow-y-scroll p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Products Page</h1>
          <Link to="/admin/product/new"> add new product</Link>
        </div>
        <ProductsTable />
      </div>
    </div>
  )
}
