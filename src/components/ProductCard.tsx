import { ChangeEvent, useState } from 'react'
import { Category } from '../redux/slices/products/categories/categorySlice'
import { Product } from '../redux/slices/products/productSlice'
type ProductCardProps = {
  product: Product
  categories: Category[]
}
const ProductCard = ({ product, categories }: ProductCardProps) => {
  const [sizeOption, setSizedOption] = useState('') // Default selected option
  const [selectedOption, setSelectedOption] = useState('') // Default selected option

  const handleVarientSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value)
  }
  const handleSizeSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSizedOption(event.target.value)
  }
  return (
    <div className="group relative text-left">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            {product.categories.map((categoryId) => (
              <span key={product.id}>
                {categories.map((category) => category.id == categoryId && category.name)}
              </span>
            ))}
            {product.sizes.length > 0 && (
              <div className="p-1">
                <label htmlFor="selectOption" className=" text-sm font-bold mb-2">
                  Select Size:
                </label>
                <select
                  id="selectOption"
                  value={sizeOption}
                  onChange={handleSizeSelectChange}
                  className="p-2 rounded-md border border-gray-300 bg-slate-50 focus:outline-none focus:ring focus:border-blue-300">
                  {product.sizes.map((size) => (
                    <option key={size} value={size} className="py-1 text-white">
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {product.variants.length > 0 && (
              <div className="p-1">
                <label htmlFor="selectOption" className=" text-sm font-bold mb-2">
                  Select variant:
                </label>
                <select
                  id="selectOption"
                  value={selectedOption}
                  onChange={handleVarientSelectChange}
                  className="p-2 rounded-md border border-gray-300 bg-slate-50 focus:outline-none focus:ring focus:border-blue-300">
                  {product.variants.map((variant) => (
                    <option key={variant} value={variant} className="py-1 text-white">
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
      <button>add To Cart</button>
    </div>
  )
}

export default ProductCard
