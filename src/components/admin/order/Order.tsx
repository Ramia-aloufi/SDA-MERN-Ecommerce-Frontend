import { RiAddLine } from 'react-icons/ri'
import { AdminSidbar } from '../AdminSidbar'
import { Link } from 'react-router-dom'
import OrderTable from './OrderTable'

export const Order = () => {
  return (
    <div className=" h-screen grid grid-cols-[1fr,4fr] ">
      <AdminSidbar />
      <div className="flex flex-col gap-5  overflow-y-scroll p-6">
        <div className="grid grid-cols-[2fr,1fr] items-center justify-between py-2">
          <h1 className="text-2xl font-bold">Category Page</h1>
          <button className="btn">
            <Link className="flex justify-center items-center gap-1" to="/admin/product/new">
              add new category
              <RiAddLine className="text-xl" />
            </Link>
          </button>
        </div>
        <OrderTable />
      </div>
    </div>
  )
}
