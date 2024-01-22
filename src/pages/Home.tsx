import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../redux/store'
import ProductCard from '../components/ProductCard'
import { productState } from '../redux/slices/products/productSlice'
import Offer from '../components/Offer'
import Banner from '../components/Banner'
import Pagination from '../components/Pagination'
import { fetchProduct } from '../Servies/product'
import FilterAndSort from '../components/FilterAndSort'
import { LineWave } from 'react-loader-spinner'

const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { totalPages, currentPage, products, productsCount, isLoading } = useSelector(productState)

  const handlePageChange = (page: number) => {
    dispatch(fetchProduct({ page: page }))
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <LineWave color="orange" thickness="6px" speed="0.3s" />
      </div>
    )
  }

  return (
    <div className="overflow-hidden relative space-y-4 px-8">
      <Banner />
      <Offer />
      <FilterAndSort />
      <span className="mt-2 text-center w-full grid text-gray-400">{productsCount} products</span>
      <div className=" w-full gap-x-4 gap-y-4 grid place-items-center grid-cols-1 sm:grid-cols-2 xs:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default Home
