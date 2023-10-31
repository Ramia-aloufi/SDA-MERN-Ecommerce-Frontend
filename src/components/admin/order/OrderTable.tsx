import { useSelector } from 'react-redux'
import { FiTrash, FiEdit } from 'react-icons/fi'

import { orderState } from '../../../redux/slices/Order/OrderSlice'

const OrderTable = () => {
  const { orders } = useSelector(orderState)
  // const dispatch = useDispatch<AppDispatch>()
  const handleDelete = (id: number) => {
    console.log(id)
  }
  return (
    <table className="min-w-full table-auto text-xs">
      <thead>
        <tr className="bg-[#434343] text-white">
          <th className="border p-2">Id</th>
          <th className="border p-2">userId</th>
          <th className="border p-2">productId</th>
          <th className="border p-2">purchasedAt</th>
          <th className="border p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(({ id, userId, productId, purchasedAt }, index) => {
          return (
            <tr key={id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
              <td className="border p-2">{id}</td>
              <td className="border p-2">{userId}</td>
              <td className="border p-2">{productId}</td>
              <td className="border p-2">{`${purchasedAt}`}</td>
              <td className="border  py-2 grid gap-3 justify-center ">
                <button onClick={() => handleDelete(id)} className="trashBtn">
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
