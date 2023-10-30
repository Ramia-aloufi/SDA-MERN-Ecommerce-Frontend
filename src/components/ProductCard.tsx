import { ChangeEvent, useState } from 'react'

import { Product, addToCart } from '../redux/slices/products/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { categoryState } from '../redux/slices/categories/categorySlice'
import { Link } from 'react-router-dom'

type ProductCardProps = {
  product: Product
}
const ProductCard = ({ product }: ProductCardProps) => {
  const categories = useSelector(categoryState).categories
  const dispatch = useDispatch()

  const handeAddToCart = (product: Product) => {
    console.log(product)
    dispatch(addToCart(product))
  }
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedVarient, setSelectedVarient] = useState('')

  const handleSizeSelection = (size: string) => {
    console.log(size)
    setSelectedSize(size)
  }
  const handleVarientSelection = (varient: string) => {
    console.log(varient)
    setSelectedVarient(varient)
  }
  return (
    <div className="grid space-y-2 max-w-[340px]  bg-white relative text-left shadow-sm rounded-md p-4  lg:h-[400px]">
      <Link to={`/product/${product.id}`}>
        <div className=" w-full overflow-hidden rounded-lg lg:aspect-none group-hover:opacity-75 h-[200px]  ">
          <img src={product.image} alt={product.name} className="h-full w-full  object-center" />
        </div>
      </Link>
      <div className="mt-1 flex justify-between">
        <div>
          <h2 className="block text-md font-semibold">{product.name}</h2>{' '}
          {/* {product.categories.map((categoryId) => (
            <span key={categoryId}>
              {categories.map((category) => category.id == categoryId && category.name)}
            </span>
          ))} */}
          {/* {product.sizes.length > 0 && (
            <div className="p-1 flex gap-2 items-center flex-wrap">
              <label htmlFor={`selectedSize-${product.id}`} className=" text-sm font-bold mb-2">
                Size:
              </label>
              {product.sizes.map((size, index) => (
                <span
                  id={`selectedSize-${index}`}
                  className={`text-black border  px-4 py-2 rounded-full text-[11px] ${
                    selectedSize === size ? 'border-slate-400' : 'border-slate-200 '
                  }`}
                  key={index}
                  onClick={() => handleSizeSelection(size)}>
                  {size}
                </span>
              ))}
            </div>
          )}
          {product.variants.length > 0 && (
            <div className="p-1 flex gap-2 items-center flex-wrap">
              <label htmlFor={`selecVariant-${product.id}`} className=" text-sm font-bold mb-2">
                variant:
              </label>

              {product.variants.map((variant, index) => (
                <span
                  id="selecVariant"
                  className={`text-black border  px-4 py-2 rounded-full text-[11px] ${
                    selectedVarient === variant ? 'border-slate-400' : 'border-slate-200 '
                  }`}
                  key={index}
                  onClick={() => handleVarientSelection(variant)}>
                  {variant}
                </span>
              ))}
            </div>
          )} */}
          <p className="mt-1 text-sm text-gray-500">{product.description}</p>
        </div>
      </div>
      <button className="btn" onClick={() => handeAddToCart(product)}>
        add To Cart
      </button>
    </div>
  )
}

export default ProductCard
