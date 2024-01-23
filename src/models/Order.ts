import User from './User'

type Payment = {
  paymentMethod?: string
  amount: number
}
type orderItem = {
  product: string
  quantity: number
}
type Order = {
  _id: string
  buyer: User['_id']
  products: orderItem[]
  payment: Payment
  status: 'Not Processed' | 'Processed' | 'Shipped' | 'Delivered' | 'Canceled'
}

export default Order
