import { useDispatch, useSelector } from 'react-redux'
import { FiTrash, FiEdit } from 'react-icons/fi'
import { deleteProduct, productState } from '../../../redux/slices/products/productSlice'
import { useNavigate } from 'react-router-dom'

export const ProductsTable = () => {
  const products = useSelector(productState).products
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handkeDelete = (id: number) => {
    console.log(id)
    dispatch(deleteProduct(Number(id)))
  }
  const handleEdit = (id: number) => {
    const product = id
    navigate(`/admin/product/update/${product}`)
  }

  return (
    <table className="min-w-full table-auto text-xs">
      <thead>
        <tr className="bg-[#434343] text-white">
          <th className="border p-2">Id</th>
          <th className="border p-2">Name</th>
          <th className="border p-2">Size</th>
          <th className="border p-2">Image</th>
          <th className="border p-2">Varients</th>
          <th className="border p-2">Catergories</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products &&
          products.map((product, index) => {
            return (
              <tr key={product.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="border p-2">{product.id}</td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">{product.sizes.map((size) => size)}</td>
                <td className="border p-2">
                  <img className="w-20 h-20" src={product.image} alt={product.name} />
                </td>
                <td className="border p-2">{product.variants.map((varient) => varient)}</td>
                <td className="border p-2">{product.categories.map((id) => id)}</td>
                <td className="border p-2 grid gap-3 justify-center">
                  <button className="trashBtn">
                    <FiTrash
                      className="inline-block text-m align-text-top"
                      onClick={() => handkeDelete(product.id)}
                    />
                  </button>
                  <button className="editBtn">
                    <FiEdit
                      className="inline-block text-m align-text-top"
                      onClick={() => handleEdit(product.id)}
                    />
                  </button>
                </td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}
