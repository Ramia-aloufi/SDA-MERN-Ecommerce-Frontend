import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch } from 'react-redux'
import { object, string, z } from 'zod'
import { toast } from 'react-toastify'

import { Product, addProduct } from '../../../redux/slices/products/productSlice'
import { AppDispatch } from '../../../redux/store'

const productSchema = object({
  name: string().min(6),
  image: string().min(6),
  description: string().min(1),
  categories: string().min(1),
  variants: string().min(1),
  sizes: string().min(1),
  price: string().min(1)
})

type ProductSchema = z.infer<typeof productSchema>

export function ProductForm() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema)
  })
  const dispatch = useDispatch<AppDispatch>()
  const convertToArrayString = (data: string): string[] | number[] => {
    return data.split(',').map((size: string) => size.trim())
  }
  const convertToArrayNumber = (data: string): number[] => {
    return data.split(',').map(Number)
  }

  const onSubmit = (data: ProductSchema) => {
    const transformedData = {
      ...data,
      categories: convertToArrayNumber(data.categories),
      variants: convertToArrayString(data.variants),
      sizes: convertToArrayString(data.sizes),
      price: Number(data.price)
    }
    console.log(transformedData)
    try {
      dispatch(addProduct(transformedData))
      toast.success('Added New Product successfully!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000
      })
      reset()
      navigate('/admin/product')
    } catch (error) {
      console.error('Validation error:')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* <ToastContainer /> */}
      <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className=" text-3xl font-extrabold text-gray-900">Add New Product</h2>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" {...register('name')} />
            {errors.name && <p className="errorMessage">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="image">Image URL:</label>
            <input type="text" id="image" {...register('image')} />
            {errors.image && <p className="errorMessage">{errors.image.message}</p>}
          </div>
          <div>
            <label htmlFor="description"> Description: </label>
            <textarea id="description" {...register('description')} />
            {errors.description && <p className="errorMessage">{errors.description.message}</p>}
          </div>
          <div>
            <label htmlFor="categories">Categories: (use comma , to create multiple)</label>
            <input type="text" id="categories" {...register('categories')} />
            {errors.categories && <p className="errorMessage">{errors.categories.message}</p>}
          </div>
          <div>
            <label htmlFor="variants">Variants: (use comma , to create multiple)</label>
            <input type="text" id="variants" {...register('variants')} />
            {errors.variants && <p className="errorMessage">{errors.variants.message}</p>}
          </div>
          <div>
            <label htmlFor="sizes">Sizes: (use comma , to create multiple)</label>
            <input type="text" id="sizes" {...register('sizes')} />
            {errors.sizes && <p className="errorMessage">{errors.sizes.message}</p>}
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input type="number" id="price" {...register('price')} />
            {errors.price && <p className="errorMessage">{errors.price.message}</p>}
          </div>
          <button type="submit" className="btn">
            Add Product
          </button>
        </form>
      </div>
    </div>
  )
}
