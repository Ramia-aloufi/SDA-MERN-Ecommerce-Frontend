import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { Product, SavedItem, addToCart } from '../redux/slices/products/productSlice'

type ProductCardProps = {
  product: Product
}
const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch()
  const handeAddToCart = (product: Product) => {
    console.log(product)
    dispatch(addToCart(product))
  }
  const handeSaveProduct = (product: Product) => {
    console.log(product.saved)
    dispatch(SavedItem(product))
  }

  return (
    <div className="grid  space-y-2 xs:w-[310px] md:w-auto  bg-white relative text-left shadow-sm rounded-md p-4  lg:h-[400px]">
      {!product.saved ? (
        <IoHeartOutline
          onClick={() => handeSaveProduct(product)}
          className="absolute top-3 right-3 text-lg text-gray-300 z-30 "
        />
      ) : (
        <IoHeart
          onClick={() => handeSaveProduct(product)}
          className="absolute top-3 right-3 text-lg text-[#419cb6] z-30 "
        />
      )}
      <Link to={`/product/${product.id}`}>
        <div className=" w-full overflow-hidden rounded-lg lg:aspect-none group-hover:opacity-75 h-[200px]  ">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full hover:scale-105 transition duration-300 ease-in-out object-center"
          />
        </div>
      </Link>
      <div className="mt-1 flex justify-between">
        <div>
          <div className="flex justify-between">
            <h2 className="block nameLines text-md font-semibold">{product.name}</h2>{' '}
            <span className="font-semibold">${product.price}</span>
          </div>
          <p className="mt-1 limitedLines text-sm text-gray-500">{product.description}</p>
        </div>
      </div>
      <button className="btn" onClick={() => handeAddToCart(product)}>
        add To Cart
      </button>
    </div>
  )
}

export default ProductCard
