import Category from './Category'

type Product = {
  _id: string
  title: string
  slug: string
  description: string
  price: number
  quantity: number
  sold: number
  image: string
  category: Category['_id']
  createdAt?: Date
  updatedAt?: Date
  __v: number
}

export default Product
