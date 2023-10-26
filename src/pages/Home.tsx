import { ChangeEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { Link } from 'react-router-dom'

import ProductCard from '../components/ProductCard'
import { fetchProduct, productState, sortProduct } from '../redux/slices/products/productSlice'

const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { items, searchTerm } = useSelector(productState)

  useEffect(() => {
    dispatch(fetchProduct())
  }, [dispatch])
  const product = searchTerm
    ? items.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : items
  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const sortVlue = e.target.value
    dispatch(sortProduct(sortVlue))
  }
  return (
    <div className="">
      <div className=" m-auto px-4 py-4  sm:py-24 xs:px-10  lg:max-w-7xl lg:px-8">
        <label htmlFor="sort">sort</label>
        <select id="sort" onChange={handleSortChange}>
          <option value="name">name</option>
          <option value="price">price</option>
        </select>
        <div className=" gap-x-4 gap-y-4 grid sm:grid-cols-2 xs:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 ">
          {product.map((product) => (
            <div key={product.id}>
              <Link to={`/product/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
