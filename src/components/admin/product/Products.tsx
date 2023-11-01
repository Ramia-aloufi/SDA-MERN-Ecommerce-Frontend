import { Link } from 'react-router-dom'
import { RiAddLine } from 'react-icons/ri'

import { AdminSidbar } from '../AdminSidbar'
import { ProductsTable } from './ProductsTable'

export const Products = () => {
  return (
    <div className="h-screen grid md:grid-cols-[1fr,4fr] xs:grid-cols-[1fr,2fr] ">
      <AdminSidbar />
      <div className="flex flex-col gap-5  overflow-y-scroll p-6">
        <div className="grid md:grid-cols-[2fr,1fr] xs:grid-cols-[1fr,1fr] items-center justify-between py-2">
          <h1 className=" md:text-2xl xs:text-lg  font-bold">Products Page</h1>
          <button className="btn ">
            <Link className="flex justify-center items-center gap-1" to="/admin/product/new">
              new product
              <RiAddLine className="text-xl" />
            </Link>
          </button>
        </div>
        <ProductsTable />
      </div>
    </div>
  )
}
