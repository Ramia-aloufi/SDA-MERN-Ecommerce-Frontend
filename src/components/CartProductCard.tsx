import { useDispatch } from 'react-redux'

import {
  DecreaseQuantity,
  IncreaseQuantity,
  Product,
  removeFromCart
} from '../redux/slices/products/productSlice'
type Props = {
  product: Product
}
const CartProductCard = ({ product }: Props) => {
  const dispatch = useDispatch()
  const onIncrease = (product: Product) => {
    dispatch(IncreaseQuantity(product))
  }

  const onDecrease = (product: Product) => {
    dispatch(DecreaseQuantity(product))
  }
  const onRemove = (product: Product) => {
    dispatch(removeFromCart(Number(product.id)))
  }

  return (
    <div className="p-4">
      <div className="  mb-4 flex items-center">
        <img
          src={product.image}
          alt={product.name}
          className="h-20 w-20 object-cover rounded-md mr-4"
        />
        <div>
          <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
          <p className="text-gray-600 mb-2">Price: ${product.price}</p>
          <p className="text-gray-600 mb-2">Quantity: {product.quantity}</p>
          <div className="flex items-center">
            <button
              onClick={() => onDecrease(product)}
              className="bg-gray-200 px-3 py-1 rounded-md mr-2">
              -
            </button>
            <button
              onClick={() => onIncrease(product)}
              className="bg-gray-200 px-3 py-1 rounded-md mr-2">
              +
            </button>
            <button
              onClick={() => onRemove(product)}
              className="bg-red-500 text-white px-3 py-1 rounded-md">
              Remove
            </button>
          </div>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default CartProductCard
