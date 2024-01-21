import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../store'
import { fetchOrder, fetchuseOrder, placeOrder } from '../../../Servies/order'
import { User } from '../user/userSlice'

export type Payment = {
  paymentMethod: string
  amount: number
}
export type orderItem = {
  product: string
  quantity: number
}
export type Order = {
  _id: string
  buyer: User['_id']
  products: orderItem[]
  payment: Payment
  status: 'Not Processed' | 'Processed' | 'Shipped' | 'Delivered' | 'Canceled'
}
export type OrderState = {
  items: Order[]
  orders: Order[]
  userOrders: Order[]
  error: null | string
  status: null | string
  isLoading: boolean
  searchTerm: string
  searchedResult: Order[]
}

const initialState: OrderState = {
  items: [],
  orders: [],
  userOrders: [],
  error: null,
  status: null,
  isLoading: false,
  searchTerm: '',
  searchedResult: []
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    deldeteOrder: (state, action) => {
      const id = action.payload
      console.log(typeof id)
      state.items = state.items.filter((category) => {
        category._id !== id
      })
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.fulfilled, (state, action) => {
        const { payload, message } = action.payload
        state.isLoading = false
        state.items = payload
        state.orders = state.items
        state.status = message
        console.log(payload)
      })
      .addCase(fetchuseOrder.fulfilled, (state, action) => {
        const { payload, message } = action.payload
        state.isLoading = false
        state.userOrders = payload
        state.status = message
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        const { payload, message } = action.payload
        console.log(action.payload)
        state.isLoading = false
        state.items.push(payload)
        state.orders = state.items
        state.status = message
      })

      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.isLoading = false
          state.error = ''
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false
          state.error = action.payload.message || 'An error occurred.'
          state.status = null
        }
      )
  }
})
export const { deldeteOrder } = orderSlice.actions

export const orderState = (state: RootState) => state.orders

export default orderSlice.reducer
