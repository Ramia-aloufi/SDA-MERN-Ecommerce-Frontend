import { Link } from 'react-router-dom'
import { AdminSidbar } from '../AdminSidbar'
import { ProductsTable } from './ProductsTable'
import { RiAddLine } from 'react-icons/ri'

export const Products = () => {
  return (
    <div className="h-screen grid grid-cols-[1fr,4fr] ">
      <AdminSidbar />
      <div className="flex flex-col gap-5 text-center overflow-y-scroll p-6">
        <div className="flex justify-between py-2">
          <h1 className="text-2xl font-bold">Products Page</h1>
          <button>
            <Link className="flex justify-center items-center gap-1" to="/admin/product/new">
              add new product
              <RiAddLine className="text-xl" />
            </Link>
          </button>
        </div>
        <ProductsTable />
      </div>
    </div>
  )
}
