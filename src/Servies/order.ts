import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { baseURL } from '../api'
import Order from '../models/Order'

export const fetchOrder = createAsyncThunk('order/fetchData', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${baseURL}/orders/all-orders`)
    return data
  } catch (err) {
    return rejectWithValue(err)
  }
})

export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (order: Partial<Order>, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseURL}/orders/process-payment`, order)
      return data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)
export const fetchuseOrder = createAsyncThunk(
  'order/fetchuseOrder',
  async (id: string | undefined, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseURL}/orders/${id}`)
      return data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)
