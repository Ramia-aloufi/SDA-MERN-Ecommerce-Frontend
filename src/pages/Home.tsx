import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../redux/store'
import ProductCard from '../components/ProductCard'
import { productState } from '../redux/slices/products/productSlice'
import Offer from '../components/Offer'
import Banner from '../components/Banner'
import Pagination from '../components/Pagination'
import { fetchProduct } from '../Servies/product'
import FilterAndSort from '../components/FilterAndSort'

const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { totalPages, currentPage, products } = useSelector(productState)

  const handlePageChange = (page: number) => {
    dispatch(fetchProduct({ page: page }))
  }

  return (
    <div className="overflow-hidden relative space-y-4 px-8">
      <Banner />
      <Offer />
      <FilterAndSort />
      <div className=" w-full gap-x-4 gap-y-4 grid place-items-center sm:grid-cols-2 xs:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
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
