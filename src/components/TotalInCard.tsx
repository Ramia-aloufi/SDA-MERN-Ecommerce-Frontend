import { useSelector } from 'react-redux'

import { productState } from '../redux/slices/products/productSlice'

const TotalInCard = () => {
  const { totalPrice } = useSelector(productState)
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
      <button>Checkout</button>
    </div>
  )
}

export default TotalInCard
