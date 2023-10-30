import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { findById, productState } from '../redux/slices/products/productSlice'
import ProductCard from '../components/ProductCard'
import { useEffect } from 'react'
import { AppDispatch } from '../redux/store'
import ProductDetailCard from '../components/ProductDetailCard'

const ProductDetails = () => {
  const { id } = useParams()
  const { singleProduct } = useSelector(productState)
  const dispatch = useDispatch<AppDispatch>()
  console.log(id)

  useEffect(() => {
    dispatch(findById(Number(id)))
  }, [dispatch, singleProduct])
  return (
    <div className=" w-1/2 shadow-md my-4 rounded-md m-auto">
      {singleProduct.id != null && <ProductDetailCard product={singleProduct} />}
    </div>
  )
}

export default ProductDetails
