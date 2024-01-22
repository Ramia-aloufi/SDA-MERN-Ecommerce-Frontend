import { useDispatch, useSelector } from 'react-redux'
import { FiTrash, FiEdit } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { LineWave } from 'react-loader-spinner'
import { useEffect } from 'react'

import { productState } from '../../../redux/slices/products/productSlice'
import { baseURL } from '../../../api'
import { deleteSingleProduct } from '../../../Servies/product'
import { AppDispatch } from '../../../redux/store'
import { showToast } from '../../../helper/toast'
import { Category } from '../../../redux/slices/categories/categorySlice'

export const ProductsTable = () => {
  const { products, status, error, isLoading } = useSelector(productState)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleDelete = (slug: string) => {
    dispatch(deleteSingleProduct(slug))
  }

  const handleEdit = (slug: string) => {
    navigate(`/admin/product/update/${slug}`)
  }

  useEffect(() => {
    status && showToast(status, true, dispatch)
    error && showToast(error, false, dispatch)
  }, [status, error])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <LineWave color="orange" thickness="6px" speed="0.3s" />
      </div>
    )
  }
  return (
    <table className="min-w-full table-auto text-xs">
      <thead>
        <tr className="bg-[#434343] text-white">
          <th className="border p-2">Id</th>
          <th className="border p-2">Name</th>
          <th className="border p-2">Description</th>
          <th className="border p-2">Image</th>
          <th className="border p-2 hidden sm:table-cell">Catergory</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products &&
          products.map((product, index) => {
            return (
              <tr key={product._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="border p-2">{index}</td>
                <td className="border p-2 xs:text-[10px] md:text-xs">{product.title}</td>
                <td className="border p-2 xs:text-[10px] md:text-xs">{product.description}</td>
                <td className="border p-2">
                  <img
                    className="w-20 h-20"
                    src={`${baseURL}/${product.image}`}
                    alt={product.title}
                  />
                </td>
                <td className="border p-2 hidden sm:table-cell">
                  {(product.category as unknown as Category).title || ''}
                </td>
                <td className="border p-2 grid gap-3 justify-center">
                  <button className="trashBtn">
                    <FiTrash
                      className="inline-block text-m align-text-top"
                      onClick={() => handleDelete(product.slug)}
                    />
                  </button>
                  <button className="editBtn">
                    <FiEdit
                      className="inline-block text-m align-text-top"
                      onClick={() => handleEdit(product.slug)}
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
