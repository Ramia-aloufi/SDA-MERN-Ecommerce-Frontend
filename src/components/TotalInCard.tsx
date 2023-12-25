import { useDispatch, useSelector } from 'react-redux'

import { productState } from '../redux/slices/products/productSlice'
import { AppDispatch } from '../redux/store'
import { placeOrder } from '../Servies/order'

const TotalInCard = () => {
  const { totalPrice, inCart } = useSelector(productState)
  const dispatch = useDispatch<AppDispatch>()
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
    dispatch(placeOrder(order))
  }
  return (
    <div className="p-4 space-y-4 bg-white">
      <h1 className="font-bold text-xl">Total</h1>
      <hr />
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold">Sup-Total</span>
        <span className="text-lg font-semibold">${totalPrice}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold">Delivery</span>
        <span className="text-lg font-semibold">Free</span>
      </div>
      <hr />
      <button className="btn" onClick={() => onSubmit()}>
        Checkout
      </button>
    </div>
  )
}

export default TotalInCard
