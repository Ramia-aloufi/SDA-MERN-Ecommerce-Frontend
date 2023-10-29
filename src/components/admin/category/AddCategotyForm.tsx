import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { addCategory } from '../../../redux/slices/categories/categorySlice'
import { object, string, z } from 'zod'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const categorySchema = object({
  name: string().min(3)
})
type CategorySchema = z.infer<typeof categorySchema>
const AddCategotyForm = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema)
  })
  const dispatch = useDispatch<AppDispatch>()
  const onSubmit = (data: CategorySchema) => {
    dispatch(addCategory(data.name))
    toast.success('Added New Category successful!', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    })
    console.log('Form values:', data.name)
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
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCategotyForm
