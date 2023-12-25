import { useSelector } from 'react-redux'
import { FiTrash, FiEdit } from 'react-icons/fi'

import { orderState } from '../../../redux/slices/Order/orderSlice'
import { Product } from '../../../redux/slices/products/productSlice'
import { User } from '../../../redux/slices/user/userSlice'

const OrderTable = () => {
  const { orders } = useSelector(orderState)
  const handleDelete = (id: number) => {
    console.log(id)
  }
  return (
    <table className="min-w-full table-auto text-xs">
      <thead>
        <tr className="bg-[#434343] text-white">
          <th className="border p-2">Id</th>
          <th className="border p-2">buyer</th>
          <th className="border p-2">products</th>
          <th className="border p-2 hidden sm:table-cell">amount</th>
          <th className="border p-2 hidden sm:table-cell">status</th>
          <th className="border p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {orders &&
          orders.map((item, index) => {
            return (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="border p-2">{item._id}</td>
                <td className="border p-2">{(item.buyer as unknown as User).username}</td>
                <td className="border p-2">
                  {item.products.map((product) => {
                    return `${(product.product as unknown as Product).title} - ${product.quantity}`
                  })}
                </td>
                <td className="border p-2 hidden sm:table-cell">{`${item.payment.amount}`}</td>
                <td className="border p-2 hidden sm:table-cell">{`${item.status}`}</td>

                <td className="border  py-2 grid gap-3 justify-center ">
                  <button onClick={() => handleDelete(index)} className="trashBtn">
                    <FiTrash />
                  </button>
                  <button className="editBtn">
                    <FiEdit />
                  </button>
                </td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

export default OrderTable
