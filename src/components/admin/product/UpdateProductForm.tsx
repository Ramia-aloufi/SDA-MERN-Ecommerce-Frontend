import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import { any, object, string, z } from 'zod'
import { useEffect } from 'react'

import { productState } from '../../../redux/slices/products/productSlice'
import { AppDispatch } from '../../../redux/store'
import { getSingleProduct, updateSingleProduct } from '../../../Servies/product'
import { Category, categoryState } from '../../../redux/slices/categories/categorySlice'

const UpdateProductForm = () => {
  const { slug } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { singleProduct } = useSelector(productState)
  const navigate = useNavigate()
  const { categories } = useSelector(categoryState)

  const productSchema = object({
    title: string().min(6),
    image: any().optional(),
    description: string().min(1),
    category: string().min(1),
    price: string().min(1),
    quantity: string().min(1)
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
    if (data.image[0].name) {
      const product = new FormData()
      console.log(data)
      console.log(data.image[0])
      product.append('title', data.title)
      product.append('image', data.image[0])
      product.append('description', data.description)
      product.append('quantity', data.quantity)
      product.append('price', data.price)
      product.append('category', data.category)
      dispatch(updateSingleProduct({ product, slug }))
    } else {
      const product = {
        ...data,
        price: Number(data.price),
        quantity: Number(data.quantity),
        image: singleProduct.image
      }
      console.log(product)
      dispatch(updateSingleProduct({ product, slug }))
    }
    reset()
    navigate('/admin/product')
  }
  useEffect(() => {
    dispatch(getSingleProduct(slug))
  }, [slug, dispatch])

  useEffect(() => {
    if (singleProduct.category !== undefined) {
      console.log(singleProduct.category)
      setValue('title', singleProduct.title || '')
      setValue('image', singleProduct.image || '')
      setValue('description', singleProduct.description || '')
      setValue('category', (singleProduct.category as unknown as Category)._id || '')
      setValue('price', `${singleProduct.price}` || '')
      setValue('quantity', `${singleProduct.quantity}` || '')
    }
  }, [singleProduct])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className=" text-3xl font-extrabold text-gray-900">Update Product</h2>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Title:</label>
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
            <label htmlFor="categories">Category</label>
            <select {...register('category')}>
              <option value="">select category</option>
              {categories &&
                categories.map((category) => {
                  return (
                    <option key={category._id} value={category._id}>
                      {category.title}
                    </option>
                  )
                })}
            </select>
            {errors.category && <p className="errorMessage">{errors.category.message}</p>}
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input type="number" id="price" {...register('price')} />
            {errors.price && <p className="errorMessage">{errors.price.message}</p>}
          </div>
          <div>
            <label htmlFor="price">Quantity:</label>
            <input type="number" id="price" {...register('quantity')} />
            {errors.quantity && <p className="errorMessage">{errors.quantity.message}</p>}
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
