import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

import { clearCart, productState } from '../redux/slices/products/productSlice'
import { placeOrder } from '../Servies/order'
import Payment from '../pages/Payment'
import { AppDispatch } from '../redux/store'

const TotalInCard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { totalPrice, inCart } = useSelector(productState)
  const [ispayment, setIsPayment] = useState(false)
  const onSubmit = () => {
    const cart = inCart.map((item) => {
      return { product: item.product._id, quantity: item.quantity }
    })
    const order = {
      products: cart,
      payment: {
        amount: totalPrice
      }
    }
    setIsPayment(true)
    dispatch(placeOrder(order))
    // dispatch(clearCart())
  }
  return (
    <div className="p-4 space-y-4 bg-white">
      <h1 className="font-bold text-xl ">Total</h1>
      <hr />
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold">Sup-Total</span>
        <span className="text-lg xs:text-md font-semibold">${totalPrice}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold">Delivery</span>
        <span className="text-lg xs:text-md font-semibold">Free</span>
      </div>
      <hr />
      <button className="btn2" onClick={() => onSubmit()}>
        Checkout
      </button>
      {ispayment && <Payment />}
    </div>
  )
}

export default TotalInCard
