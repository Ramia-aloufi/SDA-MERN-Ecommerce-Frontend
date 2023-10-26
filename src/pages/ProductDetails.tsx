import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { findById, productState } from '../redux/slices/products/productSlice'
import ProductCard from '../components/ProductCard'
import { useEffect } from 'react'
import { AppDispatch } from '../redux/store'

const ProductDetails = () => {
  const { id } = useParams()
  const { singleProduct } = useSelector(productState)
  const dispatch = useDispatch<AppDispatch>()
  console.log(singleProduct)

  useEffect(() => {
    dispatch(findById(Number(id)))
  }, [dispatch])
  return (
    <div className="w-[300px] shadow-md my-4 rounded-md m-auto">
      {singleProduct.id != null && <ProductCard product={singleProduct} />}
    </div>
  )
}

export default ProductDetails
