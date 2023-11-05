import { useDispatch, useSelector } from 'react-redux'
import { Product, SavedItem, productState } from '../redux/slices/products/productSlice'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'

const SavedProduct = () => {
  const { savedItem } = useSelector(productState)
  const dispatch = useDispatch()
  const handeSaveProduct = (product: Product) => {
    console.log(product.saved)
    dispatch(SavedItem(product))
  }

  return (
    <div className="p-4 grid place-items-center">
      {savedItem.map((product) => {
        return (
          <div key={product.id} className="mb-4  flex  border  w-2/3 relative">
            <img
              src={product.image}
              alt={product.name}
              className="h-20 w-20 object-cover rounded-md mr-4"
            />
            <div>
              <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
              <p className="text-gray-600 mb-2">Price: ${product.price}</p>
              <p className="text-gray-600 mb-2">Description: {product.description}</p>
            </div>
            {!product.saved ? (
              <IoHeartOutline
                onClick={() => handeSaveProduct(product)}
                className="absolute top-3 right-3 text-lg text-gray-300 z-30 "
              />
            ) : (
              <IoHeart
                onClick={() => handeSaveProduct(product)}
                className="absolute top-3 right-3 text-lg text-[#419cb6] z-30 "
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default SavedProduct
