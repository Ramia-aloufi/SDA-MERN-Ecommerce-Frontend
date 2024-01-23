import { useDispatch, useSelector } from 'react-redux'
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5'

import { baseURL } from '../api'
import { Product, SavedItem, addToCart, productState } from '../redux/slices/products/productSlice'
import { Category } from '../redux/slices/categories/categorySlice'

const ProductDetailCard = () => {
  const dispatch = useDispatch()
  const product = useSelector(productState).singleProduct
  const saved = useSelector(productState).saved

  const handeAddToCart = (product: Product) => {
    dispatch(addToCart(product))
  }
  const handeSaveProduct = (product: Product) => {
    dispatch(SavedItem(product))
  }
  if (!product) {
    return <p>loading</p>
  }

  return (
    <div className="">
      <div className="grid space-y-2 md:grid-cols-[1fr,1fr] xs:grid-flow-row  bg-white relative text-left shadow-sm rounded-md p-4 ">
        <div className=" w-full overflow-hidden rounded-lg lg:aspect-none group-hover:opacity-75   ">
          <img
            src={`${baseURL}/${product.image}`}
            alt={product.title}
            className="h-full w-full hover:scale-105 transition duration-300 ease-in-out  object-center"
          />
        </div>
        <div className="w-full mt-1 flex flex-col md:px-4  justify-between">
          <div className="flex justify-between xs:mt-2">
            <div className="">
              <span className="block  font-semibold ">
                {product.category && (product.category as unknown as Category).title}
              </span>
              <h2 className=" text-gray-500 text-2xl">{product.title}</h2>
            </div>
            <span className="text-xl font-bold">${product.price}</span>
          </div>

          <div className="leading-8 mt-4">
            <h3 className="mb-2 font-semibold">Description</h3>
            <hr />
            <h4 className="mb-2 font-semibold">Product Highlights</h4>
            <p className="text-sm text-gray-500 mb-2">{product.description}</p>
            <hr />
            <h4 className="mb-2 font-semibold">Delivery and Returns</h4>
            <p className="text-sm text-gray-500 mb-2">
              You have 14 days to place a FREE returns request if you change your mind. Learn more
              about our returns process here
            </p>
          </div>
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              className={`border ${
                saved.includes(product)
                  ? 'bg-gray-700 text-white'
                  : 'border-gray-500 text-gray-500 hover:bg-gray-700 hover:text-white'
              }  h-[45px] rounded flex items-center justify-center w-full   `}
              onClick={() => handeSaveProduct(product)}>
              {!saved.includes(product) ? (
                <IoBookmarkOutline className=" text-xl xs:text-md text-gray-500 cursor-pointer " />
              ) : (
                <IoBookmark className="text-xl text-[#fff] cursor-pointer" />
              )}
              {!saved.includes(product) ? 'save to wishlist' : 'saved'}
            </button>
            <button className="btn2 " onClick={() => handeAddToCart(product)}>
              add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProductDetailCard
