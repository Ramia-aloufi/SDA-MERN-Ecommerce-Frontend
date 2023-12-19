import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { any, object, string, z } from 'zod'

import { postProduct } from '../../../Servies/product'
import { showToast } from '../../../helper/toast'

const productSchema = object({
  title: string().min(6),
  image: any().optional(),
  description: string().min(1),
  category: string().min(1),
  quantity: string(),
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

  const onSubmit = async (data: ProductSchema) => {
    console.log('image', data.image[0])
    const transformedData = {
      ...data,
      image: data.image[0],
      price: Number(data.price),
      quantity: Number(data.quantity)
    }
    const formdata = new FormData()
    formdata.append('title', data.title)
    formdata.append('image', data.image[0])
    formdata.append('description', data.description)
    formdata.append('quantity', data.quantity)
    formdata.append('price', data.price)
    formdata.append('category', data.category)
    console.log(transformedData)
    try {
      await postProduct(formdata)
    } catch (err) {
      showToast(`${err}`, true)
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
            <input type="text" id="name" {...register('title')} />
            {errors.title && <p className="errorMessage">{errors.title.message}</p>}
          </div>
          <div>
            <label htmlFor="image">Image URL:</label>
            <input type="file" id="image" {...register('image')} />
          </div>
          <div>
            <label htmlFor="description"> Description: </label>
            <textarea id="description" {...register('description')} />
            {errors.description && <p className="errorMessage">{errors.description.message}</p>}
          </div>
          <div>
            <label htmlFor="categories">Categories: (use comma , to create multiple)</label>
            <input type="text" id="categories" {...register('category')} />
            {errors.category && <p className="errorMessage">{errors.category.message}</p>}
          </div>
          <div>
            <label htmlFor="sizes">Quantity:</label>
            <input type="text" id="sizes" {...register('quantity')} />
            {errors.quantity && <p className="errorMessage">{errors.quantity.message}</p>}
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
