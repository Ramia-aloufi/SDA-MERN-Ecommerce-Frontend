import { useDispatch, useSelector } from 'react-redux'
import { baseURL } from '../api'
import { Product, addToCart, productState } from '../redux/slices/products/productSlice'

const ProductDetailCard = () => {
  const dispatch = useDispatch()
  const product = useSelector(productState).singleProduct
  console.log('product', product)
  const handeAddToCart = (product: Product) => {
    console.log(product)
    dispatch(addToCart(product))
  }

  return (
    <div className="grid space-y-2 md:grid-cols-[1fr,1fr] xs:grid-flow-row  bg-white relative text-left shadow-sm rounded-md p-4 ">
      <div className=" w-full overflow-hidden rounded-lg lg:aspect-none group-hover:opacity-75   ">
        <img
          src={`${baseURL}/${product.image}`}
          alt={product.title}
          className="h-full w-full hover:scale-105 transition duration-300 ease-in-out  object-center"
        />
      </div>
      <div className="w-full mt-1 grid  justify-between">
        <div>
          <h2 className="block text-md font-semibold">{product.title}</h2>{' '}
          {/* {product.category.map((categoryId) => (
            <span key={categoryId}>
              {categories.map((category) => category.id == categoryId && category.name)}
            </span>
          ))} */}
          {/* {product.sizes.length > 0 && (
            <div className="p-1 flex gap-2 items-center flex-wrap">
              <label
                htmlFor={`selectedSize-${product.id}`}
                className=" md:text-sm xs:text-[12px] font-bold mb-2">
                Size:
              </label>
              {product.sizes.map((size, index) => (
                <span
                  id={`selectedSize-${index}`}
                  className={`text-black border  md:px-4 xs:text-[10px] xs:px-2 xs: py-2 rounded-full md:text-[11px] ${
                    selectedSize === size ? 'border-slate-400' : 'border-slate-200 '
                  }`}
                  key={index}
                  onClick={() => handleSizeSelection(size)}>
                  {size}
                </span>
              ))}
            </div>
          )} */}
          {/* {product.variants.length > 0 && (
            <div className="p-1 flex gap-2 items-center flex-wrap">
              <label
                htmlFor={`selecVariant-${product.id}`}
                className=" md:text-sm xs:text-[12px] font-bold mb-2">
                variant:
              </label>

              {product.variants.map((variant, index) => (
                <span
                  id="selecVariant"
                  className={`text-black border  px-4 py-2  md:px-4 xs:text-[10px] xs:px-2 xs:  rounded-full text-[11px] ${
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
        <button className="btn h-[50px] mt-4 " onClick={() => handeAddToCart(product)}>
          add To Cart
        </button>
      </div>
    </div>
  )
}
export default ProductDetailCard
