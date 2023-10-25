import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { FiTrash, FiEdit } from 'react-icons/fi'

import { AppDispatch } from '../../../redux/store'
import { categoryState, fetchCategory } from '../../../redux/slices/categories/categorySlice'

const CategoryTable = () => {
  const dispatch = useDispatch<AppDispatch>()
  const categories = useSelector(categoryState)

  useEffect(() => {
    dispatch(fetchCategory())
  }, [])

  return (
    <table className="min-w-full table-auto text-xs">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Id</th>
          <th className="border p-2">Name</th>
          <th className="border p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category, index) => {
          return (
            <tr key={category.id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="border p-2">{category.id}</td>
              <td className="border p-2">{category.name}</td>
              <td className="border  py-2 grid gap-3 justify-center ">
                <button className="trashBtn">
                  <FiTrash />
                </button>
                <button className="editBtn">
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
