import { useDispatch, useSelector } from 'react-redux'
import api from '../../../api'
import {
  categoriesRequest,
  categoriesSuccess
} from '../../../redux/slices/categories/categorySlice'
import { AppDispatch, RootState } from '../../../redux/store'
import { useEffect } from 'react'
import { FiTrash, FiEdit } from 'react-icons/fi'

const CategoryTable = () => {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const categories = state.categories

  useEffect(() => {
    handleGetCategories()
  }, [])

  const handleGetCategories = async () => {
    dispatch(categoriesRequest())
    const res = await api.get('/mock/e-commerce/categories.json')
    dispatch(categoriesSuccess(res.data))
  }
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
        {categories.items.map((category, index) => {
          return (
            <tr key={category.id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="border p-2">{category.id}</td>
              <td className="border p-2">{category.name}</td>
              <td className="border  py-2 grid gap-3 justify-center ">
                <button className="bg-yellow">
                  <FiTrash />
                </button>
                <button className="bg-yellow">
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
