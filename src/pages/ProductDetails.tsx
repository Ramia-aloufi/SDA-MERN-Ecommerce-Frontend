import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

import { productState } from '../redux/slices/products/productSlice'
import { AppDispatch } from '../redux/store'
import ProductDetailCard from '../components/ProductDetailCard'
import { getSingleProduct } from '../Servies/product'

const ProductDetails = () => {
  const { slug } = useParams()
  const { isLoading } = useSelector(productState)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getSingleProduct(slug))
  }, [slug, dispatch])
  {
    isLoading && <h2>loading</h2>
  }
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-2/3 shadow-md my-4 rounded-md m-auto">
        <ProductDetailCard />
      </div>
    </div>
  )
}

export default ProductDetails
