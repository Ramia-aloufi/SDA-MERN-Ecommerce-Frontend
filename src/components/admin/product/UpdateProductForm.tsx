import {
  Product,
  UpdateProduct,
  findById,
  productState
} from '../../../redux/slices/products/productSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { object, string, z } from 'zod'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const UpdateProductForm = () => {
  const { product } = useParams()
  const id = Number(product)
  const dispatch = useDispatch<AppDispatch>()
  const { singleProduct } = useSelector(productState)
  const navigate = useNavigate()
  console.log('aa')

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
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema)
  })

  const onSubmit = (data: ProductSchema) => {
    const transformedData = {
      ...data,
      categories: data.categories.split(',').map(Number),
      variants: data.variants.split(',').map((variant: string) => variant.trim()),
      sizes: data.sizes.split(',').map((size: string) => size.trim()),
      price: Number(data.price)
    }
    const id = Number(product)
    const quantity = 0
    const UpdatedProduct: Product = { ...transformedData, id, quantity }
    console.log(UpdatedProduct)
    try {
      dispatch(UpdateProduct(UpdatedProduct))
      toast.success('Added New Product successfully!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000
      })
      reset()
      navigate('/admin/product')
    } catch (error) {
      console.error('Validation error:')
      // Handle validation error
      // You can set an error state or display a notification to the user
    }
  }
  useEffect(() => {
    dispatch(findById(Number(id)))
  }, [product])

  useEffect(() => {
    setValue('name', singleProduct.name || '')
    setValue('image', singleProduct.image || '')
    setValue('description', singleProduct.description || '')
    setValue('categories', singleProduct.categories?.join(', ') || '')
    setValue('variants', singleProduct.variants?.join(', ') || '')
    setValue('sizes', singleProduct.sizes?.join(', ') || '')
    setValue('price', `${singleProduct.price}` || '')
  }, [singleProduct])
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* <ToastContainer /> */}
      <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className=" text-3xl font-extrabold text-gray-900">Update Product</h2>
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
export default UpdateProductForm