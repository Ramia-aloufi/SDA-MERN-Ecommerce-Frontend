import { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { Link } from 'react-router-dom'

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
    <div className="">
      <div className=" m-auto px-4 py-4  sm:py-24 xs:px-10  lg:max-w-7xl lg:px-8">
        <Banner />
        <Offer />
        <div className="flex items-end md:justify-end gap-4 py-4">
          <label htmlFor="sort">sort</label>
          <select id="sort" onChange={handleSortChange}>
            <option value="name">name</option>
            <option value="price">price</option>
          </select>
        </div>
        <div className=" gap-x-4 gap-y-4 grid sm:grid-cols-[1fr,4fr] xs:grid-cols-[1fr,2fr] ">
          <CategoryFilter />
          <div className="gap-x-4 gap-y-4 grid sm:grid-cols-2 xs:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
