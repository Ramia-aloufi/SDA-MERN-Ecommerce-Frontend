import { RiAddLine } from 'react-icons/ri'
import { AdminSidbar } from '../AdminSidbar'
import CategoryTable from './CategoryTable'
import { Link } from 'react-router-dom'

export const Category = () => {
  return (
    <div className=" h-screen grid grid-cols-[1fr,4fr] ">
      <AdminSidbar />
      <div className="flex flex-col gap-5  overflow-y-scroll p-6">
        <div className="grid  grid-cols-[2fr,1fr] items-center justify-between py-2">
          <h1 className="text-2xl font-bold">Category Page</h1>
          <button className="btn">
            <Link className="flex justify-center items-center gap-1" to="/admin/category/new">
              add new category
              <RiAddLine className="text-xl" />
            </Link>
          </button>
        </div>
        <CategoryTable />
      </div>
    </div>
  )
}
