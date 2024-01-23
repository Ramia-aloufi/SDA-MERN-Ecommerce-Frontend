import { createSlice } from '@reduxjs/toolkit'

import { fetchOrder, fetchuseOrder, placeOrder } from '../../../Servies/order'
import Order from '../../../models/Order'

type OrderState = {
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
      })
      .addCase(fetchuseOrder.fulfilled, (state, action) => {
        const { payload, message } = action.payload
        state.isLoading = false
        state.userOrders = payload
        state.status = message
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        const { payload, message } = action.payload
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
          state.error = action.payload.response.data.errors.message || 'An error occurred.'
          state.status = null
        }
      )
  }
})
export const { deldeteOrder } = orderSlice.actions

export default orderSlice.reducer
