import { useSelector } from 'react-redux'

import { productState } from '../redux/slices/products/productSlice'
import CartProductCard from '../components/CartProductCard'
import TotalInCard from '../components/TotalInCard'

const CartPage = () => {
  const { inCart } = useSelector(productState)

  return (
    <div className="h-full gap-4 grid grid-cols-[2fr,1fr]  p-2">
      <div className=" bg-white">
        {inCart.map((product) => (
          <CartProductCard key={product.id} product={product} />
        ))}
      </div>

      <TotalInCard />
    </div>
  )
}

export default CartPage
