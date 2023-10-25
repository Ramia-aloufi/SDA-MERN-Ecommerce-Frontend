import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchProduct, productState } from '../redux/slices/products/productSlice'
import ProductCard from '../components/ProductCard'
import { useEffect } from 'react'
import { AppDispatch } from '../redux/store'

const ProductDetails = () => {
  const { id } = useParams()
  const { items } = useSelector(productState)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchProduct())
  }, [])
  return (
    <div className="w-[300px] shadow-md my-4 rounded-md m-auto">
      {items.length > 0 &&
        items.map((product) => {
          return product.id == Number(id) && <ProductCard product={product} />
        })}
    </div>
  )
}

export default ProductDetails
