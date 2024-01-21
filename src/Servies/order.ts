import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { baseURL } from '../api'
import { Order } from '../redux/slices/Order/orderSlice'

export const fetchOrder = createAsyncThunk('order/fetchData', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${baseURL}/orders/all-orders`)
    return data
  } catch (err) {
    const message = err.response.data.errors
    return rejectWithValue(message)
  }
})

export const placeOrder = createAsyncThunk('order/placeOrder', async (order: Partial<Order>) => {
  try {
    const { data } = await axios.post(`${baseURL}/orders/process-payment`, order)
    return data
  } catch (error) {
    const message = error.response.message || 'fetchOrder error'
    return message
  }
})
export const fetchuseOrder = createAsyncThunk(
  'order/fetchuseOrder',
  async (id: string | undefined) => {
    try {
      const { data } = await axios.get(`${baseURL}/orders/${id}`)
      return data
    } catch (error) {
      const message = error.response.message || 'fetchOrder error'
      return message
    }
  }
)
