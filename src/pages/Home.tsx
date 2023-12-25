import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../redux/store'
import ProductCard from '../components/ProductCard'
import { productState, sortProduct } from '../redux/slices/products/productSlice'
import Offer from '../components/Offer'
import Banner from '../components/Banner'
import CategoryFilter from '../components/CategoryFilter'
import Pagination from '../components/Pagination'
import { fetchProduct } from '../Servies/product'

const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { totalPages, currentPage, products } = useSelector(productState)
  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const sortVlue = e.target.value
    dispatch(sortProduct(sortVlue))
  }
  //   const productsPerPage = 8 // Number of products to display per page

  // const [currentPage, setCurrentPage] = useState(1)
  // const productsPerPage = 8 // Number of products to display per page

  // Get current products based on currentPage
  // const indexOfLastProduct = currentPage * productsPerPage
  // const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  // const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

  const handlePageChange = (page: number) => {
    console.log(page || "0")
    dispatch(fetchProduct({ page: page }))
  }
  return (
    <div className="overflow-hidden relative space-y-4 px-8">
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

// import React, { useState } from 'react'
// import Pagination from '../components/Pagination'
// import ProductCard from '../components/ProductCard'
// import { useSelector } from 'react-redux'
// import { productState } from '../redux/slices/products/productSlice'

// const ProductsPage = () => {
//   // Sample products data
//   const { products } = useSelector(productState)
//   const productsPerPage = 8 // Number of products to display per page

//   const [currentPage, setCurrentPage] = useState(1)

//   // Get current products based on currentPage
//   const indexOfLastProduct = currentPage * productsPerPage
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage
//   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page)
//   }

//   return (
//     <div className="overflow-hidden space-y-4 px-8">
//       {/* Other content */}
//       <div className=" w-full gap-x-4 gap-y-4 grid place-items-center sm:grid-cols-2 xs:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
//         {currentProducts.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//       <Pagination
//         currentPage={currentPage}
//         totalPages={Math.ceil(products.length / productsPerPage)}
//         onPageChange={handlePageChange}
//       />
//     </div>
//   )
// }

// export default ProductsPage
