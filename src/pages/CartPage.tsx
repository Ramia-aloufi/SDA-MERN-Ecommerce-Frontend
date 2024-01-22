import { useSelector } from 'react-redux'

import { productState } from '../redux/slices/products/productSlice'
import CartProductCard from '../components/CartProductCard'
import TotalInCard from '../components/TotalInCard'
import EmptyCart from '../components/EmptyCart'

const CartPage = () => {
  const { inCart } = useSelector(productState)
  if (inCart.length == 0) {
    return <EmptyCart />
  }
  return (
    <div className="h-full gap-3 grid grid-cols-[2fr,1fr]  p-2">
      <div className=" bg-white">
        {inCart.map((item) => (
          <CartProductCard key={item.product._id} {...item} />
        ))}
      </div>

      <TotalInCard />
    </div>
  )
}

export default CartPage
