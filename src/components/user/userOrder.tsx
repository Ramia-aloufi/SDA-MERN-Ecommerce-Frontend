import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

import { fetchuseOrder } from '../../Servies/order'
import Product from '../../models/Product'
import orderState from '../../models/OrderState'
import AppDispatch from '../../models/AppDispatch'
import Order from '../../models/Order'

const OrderDetils = () => {
  const { id } = useParams()
  const { userOrders } = useSelector(orderState)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchuseOrder(id))
  }, [id])

  return (
    <table className="min-w-full table-auto text-xs">
      <thead>
        <tr className="bg-[#434343] text-white">
          <th className="border p-2">Id</th>
          <th className="border p-2">products</th>
          <th className="border p-2 hidden sm:table-cell">amount</th>
          <th className="border p-2 hidden sm:table-cell">status</th>
        </tr>
      </thead>
      <tbody>
        {userOrders &&
          userOrders.map((item: Order, index: number) => {
            return (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">
                  {item.products.map((product) => {
                    return `${(product.product as unknown as Product).title} - ${
                      product.quantity
                    } \n`
                  })}
                </td>
                <td className="border p-2 hidden sm:table-cell">{`${item.payment.amount}`}</td>
                <td className="border p-2 hidden sm:table-cell">{`${item.status}`}</td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

export default OrderDetils
