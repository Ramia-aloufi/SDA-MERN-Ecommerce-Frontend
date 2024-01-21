import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { object, string, z } from 'zod'
import { ToastContainer } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

import { AppDispatch } from '../../../redux/store'
import { getSingleCategory, updateSingleCategory } from '../../../Servies/category'
import { useEffect } from 'react'
import { categoryState } from '../../../redux/slices/categories/categorySlice'

const categorySchema = object({
  title: string().min(3)
})
type CategorySchema = z.infer<typeof categorySchema>
const UpdateCategoryForm = () => {
  const { slug } = useParams()
  const { singleCategory } = useSelector(categoryState)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema) // Use Zod schema resolver
  })

  const dispatch = useDispatch<AppDispatch>()
  const onSubmit = ({ title }: CategorySchema) => {
    dispatch(updateSingleCategory({ title, slug }))
    reset()
    navigate('/admin/category')
  }
  useEffect(() => {
    dispatch(getSingleCategory(slug))
  }, [slug, dispatch])
  useEffect(() => {
    if (singleCategory !== null) {
      setValue('title', singleCategory?.title || '')
    }
  }, [singleCategory])
  console.log(singleCategory)
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <ToastContainer />
      <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Update Category</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Category Name
            </label>
            <input
              {...register('title')}
              id="email"
              type="text"
              className="p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-200"
            />
            {errors.title && <p className="text-red-600">{errors.title.message}</p>}
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
function setValue(arg0: string, arg1: string) {
  throw new Error('Function not implemented.')
}
