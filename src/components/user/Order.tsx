import UserSidbar from './UserSidbar'
import OrderDetils from './userOrder'

const OrderUser = () => {
  return (
    <div className=" h-screen grid md:grid-cols-[1fr,4fr] xs:grid-cols-[1fr,2fr]">
      <UserSidbar />
      <div className="flex flex-col gap-5  overflow-y-scroll p-6">
        <div className="grid grid-cols-[2fr,1fr] items-center justify-between py-2">
          <h1 className="md:text-2xl xs:xs:text-xl font-bold">Order Page</h1>
        </div>
        <OrderDetils />
      </div>
    </div>
  )
}
export default OrderUser
