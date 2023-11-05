import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { object, string, z } from 'zod'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

import { AppDispatch } from '../../../redux/store'
import { Category, UpdateCategory } from '../../../redux/slices/categories/categorySlice'

const categorySchema = object({
  name: string().min(3)
})
type CategorySchema = z.infer<typeof categorySchema>
const UpdateCategoryForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema) // Use Zod schema resolver
  })

  const dispatch = useDispatch<AppDispatch>()
  const onSubmit = ({ name }: CategorySchema) => {
    if (id) {
      const categoryId = Number(id)
      const updatedCategory: Category = { id: categoryId, name }
      dispatch(UpdateCategory(updatedCategory))
      toast.success('Added New Category successful!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000
      })
    }
    reset()
    navigate('/admin/category')
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <ToastContainer />
      <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Add New Category</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Category Name
            </label>
            <input
              {...register('name')}
              id="email"
              type="text"
              className="p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-200"
            />
            {errors.name && <p className="text-red-600">{errors.name.message}</p>}
          </div>
          <div>
            <button type="submit" className="btn">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateCategoryForm
