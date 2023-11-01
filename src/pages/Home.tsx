import { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../redux/store'
import ProductCard from '../components/ProductCard'
import { productState, sortProduct } from '../redux/slices/products/productSlice'
import Offer from '../components/Offer'
import Banner from '../components/Banner'
import CategoryFilter from '../components/CategoryFilter'

const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { products } = useSelector(productState)

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const sortVlue = e.target.value
    dispatch(sortProduct(sortVlue))
  }
  return (
    <div className="overflow-hidden space-y-4 px-8">
      <Banner />
      <Offer />
      <CategoryFilter />
      <div className="flex items-center justify-between gap-4 py-4">
        <span className="font-semibold text-xl">Products</span>
        <div className="flex">
          <label htmlFor="sort">Sort:</label>
          <select id="sort" onChange={handleSortChange}>
            <option value="name" className="p-4">
              Name
            </option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>
      <div className=" w-full gap-x-4 gap-y-4 grid place-items-center sm:grid-cols-2 xs:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Home
