import { AdminSidbar } from '../AdminSidbar'
import CategoryTable from './CategoryTable'

export const Category = () => {
  return (
    <div className=" h-screen grid grid-cols-[1fr,4fr] ">
      <AdminSidbar />
      <div className="flex flex-col gap-5  overflow-y-scroll p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Category Page</h1>
          <button>Add new Category</button>
        </div>
        <CategoryTable />
      </div>
    </div>
  )
}
