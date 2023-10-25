import { ChangeEvent, useEffect, useState } from 'react'
import { Product } from '../redux/slices/products/productSlice'
import { AppDispatch } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { categoryState, fetchCategory } from '../redux/slices/categories/categorySlice'

type ProductCardProps = {
  product: Product
}
const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const [selectedSize, setSelectedSize] = useState('')
  const [selecVariant, setSelectedVariant] = useState('')
  const categories = useSelector(categoryState)
  const handleVarientSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedVariant(event.target.value)
  }
  const handleSizeSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value)
  }
  useEffect(() => {
    dispatch(fetchCategory())
  }, [dispatch])
  return (
    <div className="group bg-white relative justify-evenly items-baseline text-left shadow-sm rounded-md p-4 h-[525px]">
      <div className=" w-full overflow-hidden rounded-lg lg:aspect-none group-hover:opacity-75 h-[250px]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="mt-1 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            {product.categories.map((categoryId) => (
              <span key={categoryId}>
                {categories.map((category) => category.id == categoryId && category.name)}
              </span>
            ))}
            {product.sizes.length > 0 && (
              <div className="p-1">
                <label htmlFor={`selectedSize-${product.id}`} className=" text-sm font-bold mb-2">
                  Select Size:
                </label>
                <select
                  value={selectedSize}
                  id={`selectedSize-${product.id}`}
                  onChange={handleSizeSelectChange}
                  className="p-2 rounded-md border border-gray-300 bg-slate-50 focus:outline-none focus:ring focus:border-blue-300">
                  {product.sizes.map((size, index) => (
                    <option key={index} value={size} className="py-1 text-white">
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {product.variants.length > 0 && (
              <div className="p-1">
                <label htmlFor={`selecVariant-${product.id}`} className=" text-sm font-bold mb-2">
                  Select variant:
                </label>
                <select
                  id={`selecVariant-${product.id}`}
                  value={selecVariant}
                  onChange={handleVarientSelectChange}
                  className="p-2 rounded-md border border-gray-300 bg-slate-50 focus:outline-none focus:ring focus:border-blue-300">
                  {product.variants.map((variant, index) => (
                    <option key={index} value={variant} className="py-1 text-white">
                      {variant}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.description}</p>
        </div>
      </div>
      <button className="absolute bottom-4 right-4 left-4">add To Cart</button>
    </div>
  )
}

export default ProductCard
