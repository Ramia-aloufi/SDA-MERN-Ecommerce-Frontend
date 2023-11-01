import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../store'
import api from '../../../api'

export type Order = {
  id: number
  productId: number
  userId: number
  purchasedAt: Date
}
export type OrderState = {
  items: Order[]
  orders: Order[]
  error: null | string
  isLoading: boolean
  searchTerm: string
  searchedResult: Order[]
}

const initialState: OrderState = {
  items: [],
  orders: [],
  error: null,
  isLoading: false,
  searchTerm: '',
  searchedResult: []
}
export const fetchOrder = createAsyncThunk('order/fetchData', async () => {
  const response = await api.get('/mock/e-commerce/orders.json')
  if (!response.statusText) {
    throw new Error('Network response error')
  }
  const data: Order[] = await response.data
  return data
})

export const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // searchCategory: (state, action) => {
    //   console.log(action.payload)
    //   state.searchTerm = action.payload
    //   state.searchedResult = state.searchTerm
    //     ? state.items.filter((category) =>
    //         category.id.toLowerCase().includes(state.searchTerm.toLowerCase())
    //       )
    //     : state.items
    //   state.categories = state.searchedResult.length > 0 ? state.searchedResult : state.items
    // },
    deldeteOrder: (state, action) => {
      const id = action.payload
      console.log(typeof id)
      state.items = state.items.filter((category) => {
        category.id !== id
      })
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
        state.orders = state.items
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'An error occurred.'
      })
  }
})
export const { deldeteOrder } = OrderSlice.actions

export const orderState = (state: RootState) => state.orders

export default OrderSlice.reducer
