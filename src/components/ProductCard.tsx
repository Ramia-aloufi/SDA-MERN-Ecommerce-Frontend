import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { Product, SavedItem, addToCart, productState } from '../redux/slices/products/productSlice'
import { baseURL } from '../api'

type ProductCardProps = {
  product: Product
}
const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch()
  const { saved } = useSelector(productState)
  const handeAddToCart = (product: Product) => {
    console.log(product)
    dispatch(addToCart(product))
  }
  const handeSaveProduct = (product: Product) => {
    console.log(product)
    dispatch(SavedItem(product))
  }
  console.log(product.image)

  return (
    <div className="grid  space-y-2 xs:w-[310px] md:w-auto  bg-white relative text-left shadow-sm rounded-md p-4  lg:h-[400px]">
      <div className="absolute top-3 right-3 text-lg bg-white shadow-md z-30 p-2 rounded-full ">
        {!saved.includes(product) ? (
          <IoHeartOutline
            onClick={() => handeSaveProduct(product)}
            className=" text-lg text-gray-300 "
          />
        ) : (
          <IoHeart onClick={() => handeSaveProduct(product)} className="text-lg text-[#419cb6]  " />
        )}
      </div>

      <Link to={`/product/${product.slug}`}>
        <div className=" w-full overflow-hidden rounded-lg lg:aspect-none group-hover:opacity-75 h-[200px]  ">
          <img
            src={`${baseURL}/${product.image}`}
            alt={product.title}
            className="h-full w-full hover:scale-105 transition duration-300 ease-in-out object-center"
          />
        </div>
      </Link>
      <div className="mt-1 flex justify-between">
        <div>
          <div className="flex justify-between">
            <h2 className="block nameLines text-md font-semibold">{product.title}</h2>{' '}
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
