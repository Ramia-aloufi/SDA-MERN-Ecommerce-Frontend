import AdminSidbar from '../AdminSidbar'
import OrderTable from './OrderTable'

const Order = () => {
  return (
    <div className=" h-screen grid md:grid-cols-[1fr,4fr] xs:grid-cols-[1fr,2fr]">
      <AdminSidbar />
      <div className="flex flex-col gap-5  overflow-y-scroll p-6">
        <div className="grid grid-cols-[2fr,1fr] items-center justify-between py-2">
          <h1 className="md:text-2xl xs:xs:text-xl font-bold">Order Page</h1>
        </div>
        <OrderTable />
      </div>
    </div>
  )
}
export default Order
