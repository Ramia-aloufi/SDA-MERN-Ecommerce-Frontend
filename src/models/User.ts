import Order from './Order'

type User = {
  _id: string
  username: string
  slug: string
  email: string
  password: string
  image?: string
  orders: Order['buyer'][]
  address: string
  phone: string
  isAdmin: boolean
  isBanned: boolean
  createdAt?: Date
  updatedAt?: Date
  __v: number
}
export default User
