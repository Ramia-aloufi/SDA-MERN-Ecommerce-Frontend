import { useDispatch, useSelector } from 'react-redux'
import { FiTrash, FiEdit } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import { categoryState, deleteCategory } from '../../../redux/slices/categories/categorySlice'
import { AppDispatch } from '../../../redux/store'

const CategoryTable = () => {
  const navigate = useNavigate()
  const { categories } = useSelector(categoryState)
  const dispatch = useDispatch<AppDispatch>()
  const handleDelete = (id: number) => {
    dispatch(deleteCategory(Number(id)))
  }

  const handleEdit = (id: number) => {
    navigate(`/admin/category/update/${id}`)
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
        {categories.map(({ _id, title }, index) => {
          return (
            <tr key={_id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
              <td className="border p-2">{index}</td>
              <td className="border p-2">{title}</td>
              <td className="border  py-2 grid gap-3 justify-center ">
                <button onClick={() => handleDelete(_id)} className="trashBtn">
                  <FiTrash />
                </button>
                <button onClick={() => handleEdit(_id)} className="editBtn">
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
