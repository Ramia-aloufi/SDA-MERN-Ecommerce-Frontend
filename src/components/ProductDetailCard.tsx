import { useDispatch, useSelector } from 'react-redux'
import { baseURL } from '../api'
import { Product, addToCart, productState } from '../redux/slices/products/productSlice'

const ProductDetailCard = () => {
  const dispatch = useDispatch()
  const product = useSelector(productState).singleProduct
  console.log('product', product)
  const handeAddToCart = (product: Product) => {
    console.log(product)
    dispatch(addToCart(product))
  }

  return (
    <div className="grid space-y-2 md:grid-cols-[1fr,1fr] xs:grid-flow-row  bg-white relative text-left shadow-sm rounded-md p-4 ">
      <div className=" w-full overflow-hidden rounded-lg lg:aspect-none group-hover:opacity-75   ">
        <img
          src={`${baseURL}/${product.image}`}
          alt={product.title}
          className="h-full w-full hover:scale-105 transition duration-300 ease-in-out  object-center"
        />
      </div>
      <div className="w-full mt-1 flex flex-col md:px-4  justify-between">
        <div>
          <h2 className="block text-md font-semibold">{product.title}</h2>{' '}
          <p className="mt-1 text-sm text-gray-500">{product.description}</p>
        </div>
        <button className="btn h-[50px] mt-4 " onClick={() => handeAddToCart(product)}>
          add To Cart
        </button>
      </div>
    </div>
  )
}
export default ProductDetailCard
