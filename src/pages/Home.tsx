import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { productsRequest, productsSuccess } from '../redux/slices/products/productSlice'
import api from '../api'
import { categoriesRequest, categoriesSuccess } from '../redux/slices/categories/categorySlice'
import ProductCard from '../components/ProductCard'

const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const products = state.products
  const categories = state.categories

  useEffect(() => {
    handleGetProducts()
    handleGetCategories()
  }, [])

  const handleGetProducts = async () => {
    dispatch(productsRequest())
    const res = await api.get('/mock/e-commerce/products.json')
    dispatch(productsSuccess(res.data))
  }
  const handleGetCategories = async () => {
    dispatch(categoriesRequest())
    const res = await api.get('/mock/e-commerce/categories.json')
    dispatch(categoriesSuccess(res.data))
  }
  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.items.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} categories={categories.items} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
