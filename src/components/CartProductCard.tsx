import { useDispatch } from 'react-redux'

import {
  DecreaseQuantity,
  IncreaseQuantity,
  removeFromCart
} from '../redux/slices/products/productSlice'
import { baseURL } from '../api'
import { IoTrashOutline } from 'react-icons/io5'
import Product from '../models/Product'
import CartItem from '../models/Cart'

const CartProductCard = (cart: CartItem) => {
  const { product, quantity } = cart
  const dispatch = useDispatch()

  const onIncrease = (product: Product) => {
    dispatch(IncreaseQuantity(product))
  }
  const onDecrease = (product: Product) => {
    dispatch(DecreaseQuantity(product))
  }
  const onRemove = (product: Product) => {
    dispatch(removeFromCart(product._id))
  }

  return (
    <div className="p-4" key={product._id}>
      <div className="  mb-4 flex items-center">
        <img
          src={`${baseURL}/${product.image}`}
          alt={product.title}
          className="h-20 w-20 object-cover rounded-md mr-4"
        />
        <div>
          <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
          <p className="text-gray-600 mb-2">Price: ${product.price}</p>
          <p className="text-gray-600 mb-2">Quantity: {quantity}</p>
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
            <button onClick={() => onRemove(product)} className="text-red-500">
              <IoTrashOutline className="text-lg" />
            </button>
          </div>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default CartProductCard
