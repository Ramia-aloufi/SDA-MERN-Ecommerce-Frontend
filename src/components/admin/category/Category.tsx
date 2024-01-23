import { RiAddLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

import AdminSidbar from '../AdminSidbar'
import CategoryTable from './CategoryTable'

const Category = () => {
  return (
    <div className=" h-screen grid md:grid-cols-[1fr,4fr] xs:grid-cols-[1fr,2fr] ">
      <AdminSidbar />
      <div className="flex flex-col gap-5  overflow-y-scroll p-6">
        <div className="grid  md:grid-cols-[2fr,1fr] xs:grid-cols-[1fr,1fr] items-center justify-between py-2">
          <h1 className="md:text-2xl xs:text-xl font-bold">Category Page</h1>
          <button className="btn">
            <Link
              className="flex justify-center items-center gap-1 xs:text-[12px] md:text-base"
              to="/admin/category/new">
              new category
              <RiAddLine className="text-xl" />
            </Link>
          </button>
        </div>
        <CategoryTable />
      </div>
    </div>
  )
}
export default Category
