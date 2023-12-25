import { useDispatch, useSelector } from 'react-redux'
import { Product, SavedItem, productState } from '../redux/slices/products/productSlice'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { baseURL } from '../api'

const SavedProduct = () => {
  const { saved } = useSelector(productState)
  const dispatch = useDispatch()
  const handeSaveProduct = (product: Product) => {
    console.log(product)
    dispatch(SavedItem(product))
  }

  return (
    <div className="p-4 grid place-items-center ">
      {saved.map((product) => {
        return (
          <div
            key={product._id}
            className="mb-4  flex items-center ps-4 py-4  w-2/3 relative shadow-sm">
            <img
              src={`${baseURL}/${product.image}`}
              alt={product.title}
              className="h-20 w-20 object-cover rounded-md mr-4"
            />
            <div>
              <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
              <p className="text-gray-600 mb-2">Price: ${product.price}</p>
            </div>
            <div className="absolute top-3 right-3 text-lg bg-white shadow-md z-30 p-2 rounded-full ">
              {!saved.includes(product) ? (
                <IoHeartOutline
                  onClick={() => handeSaveProduct(product)}
                  className=" text-lg text-gray-300 "
                />
              ) : (
                <IoHeart
                  onClick={() => handeSaveProduct(product)}
                  className="text-lg text-[#419cb6]  "
                />
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SavedProduct
