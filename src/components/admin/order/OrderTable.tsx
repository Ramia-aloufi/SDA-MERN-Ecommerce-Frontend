import { useDispatch, useSelector } from 'react-redux'
import { FiTrash, FiEdit } from 'react-icons/fi'

import { useEffect } from 'react'
import showToast from '../../../helper/toast'
import { LineWave } from 'react-loader-spinner'
import { fetchOrder } from '../../../Servies/order'
import Product from '../../../models/Product'
import User from '../../../models/User'
import AppDispatch from '../../../models/AppDispatch'
import orderState from '../../../models/OrderState'

const OrderTable = () => {
  const { orders, status, error, isLoading } = useSelector(orderState)
  const dispatch = useDispatch<AppDispatch>()

  const handleDelete = (id: number) => {
    console.log(id)
  }
  useEffect(() => {
    status && showToast(status, true, dispatch)
    error && showToast(error, false, dispatch)
  }, [status, error])

  useEffect(() => {
    dispatch(fetchOrder())
  }, [dispatch])
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <LineWave color="orange" thickness="6px" speed="0.3s" />
      </div>
    )
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
