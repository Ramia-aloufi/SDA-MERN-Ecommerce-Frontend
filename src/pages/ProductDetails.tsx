import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'

import ProductDetailCard from '../components/ProductDetailCard'
import { getSingleProduct } from '../Servies/product'
import ProductCard from '../components/ProductCard'
import productState from '../models/ProductState'
import AppDispatch from '../models/AppDispatch'

const ProductDetails = () => {
  const { slug } = useParams()
  const { isLoading, products } = useSelector(productState)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getSingleProduct(slug))
  }, [slug, dispatch])
  {
    isLoading && <h2>loading</h2>
  }
  return (
    <div className="px-14 xs:px-7 md:px-14 grid justify-center items-center overflow-hidden ">
      <span className="text-sm text-gray-600 mt-8">
        <Link to={'/'}>Home</Link>
        {'>'} {slug}
      </span>
      <div className="  rounded-md  mt-4">
        <ProductDetailCard />
      </div>
      <h2 className=" mt-8 mb-4 text-xl font-bold">Related Products</h2>
      <div className="overflow-x-scroll mb-8">
        <div className="flex gap-x-4 justify-between ">
          {products &&
            products.slice(0, 4).map((product) => (
              <div className="min-w-[300px]" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
