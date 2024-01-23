import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5'
import { SavedItem, addToCart } from '../redux/slices/products/productSlice'
import { baseURL } from '../api'
import Product from '../models/Product'
import Category from '../models/Category'
import productState from '../models/ProductState'

type ProductCardProps = {
  product: Product
}
const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch()
  const { saved } = useSelector(productState)
  const handeAddToCart = (product: Product) => {
    dispatch(addToCart(product))
  }
  const handeSaveProduct = (product: Product) => {
    dispatch(SavedItem(product))
  }

  return (
    <div
      style={{ '--image-url': `url(${baseURL}/${product.image})` } as React.CSSProperties}
      className={`  w-full relative text-left shadow-sm rounded-md p-4 h-[400px] align-bottom before:content-[''] before:absolute before:inset-0 before:bg-[image:var(--image-url)] before:bg-cover before:z-[-10] before:rounded`}>
      <Link
        className="absolute inset-0 z-[1]"
        to={`/product/${product.slug}`}
        key={product._id}></Link>
      <div className="absolute inset-x-0 bottom-0 space-y-3 py-5 text-white p-2 bg-gradient-to-t from-black to-transparent rounded ">
        <div className="flex justify-between">
          <h2 className="block nameLines text-md font-semibold">{product.title}</h2>{' '}
          {!saved.includes(product) ? (
            <IoBookmarkOutline
              onClick={() => handeSaveProduct(product)}
              className=" text-xl text-gray-300 z-10 cursor-pointer "
            />
          ) : (
            <IoBookmark
              onClick={() => handeSaveProduct(product)}
              className="text-xl text-[#fff] z-10 cursor-pointer"
            />
          )}
        </div>
        <span className="font-semibold">{(product.category as unknown as Category).title}</span>

        <div className="flex justify-center items-center gap-7 ">
          <span className="font-semibold text-xl">${product.price}</span>
          <button
            className="btn md:text-[16px] text-md xs:text-[11px] z-10"
            onClick={() => handeAddToCart(product)}>
            add To Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
