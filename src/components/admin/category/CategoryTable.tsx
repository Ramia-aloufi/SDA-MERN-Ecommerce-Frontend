import { useDispatch, useSelector } from 'react-redux'
import { FiTrash, FiEdit } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import { categoryState } from '../../../redux/slices/categories/categorySlice'
import { AppDispatch } from '../../../redux/store'
import { deleteSingleCategory } from '../../../Servies/category'
import { useEffect } from 'react'
import { showToast } from '../../../helper/toast'
import { LineWave } from 'react-loader-spinner'

const CategoryTable = () => {
  const { categories, error, status, isLoading } = useSelector(categoryState)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleDelete = (slug: string) => {
    dispatch(deleteSingleCategory(slug))
  }

  const handleEdit = (slug: string) => {
    navigate(`/admin/category/update/${slug}`)
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
          <th className="border p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {categories.map(({ slug, title }, index) => {
          return (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
              <td className="border p-2">{index}</td>
              <td className="border p-2">{title}</td>
              <td className="border  py-2 grid gap-3 justify-center ">
                <button onClick={() => handleDelete(slug)} className="trashBtn">
                  <FiTrash />
                </button>
                <button onClick={() => handleEdit(slug)} className="editBtn">
                  <FiEdit />
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default CategoryTable
