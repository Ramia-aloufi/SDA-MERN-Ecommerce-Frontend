import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { baseURL } from '../api'
import { Product } from '../redux/slices/products/productSlice'

// type Data = {
//   message: string
//   payload: Array<Product>
//   totalPages: number
//   currentPage: number
// }

export type apiResponse = {
  message: string
  success: boolean
}
export const fetchProduct = createAsyncThunk(
  'product/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/products`)
      const data = response.data.payload
      return data
    } catch (err) {
      const message = err.response.data.errors
      return rejectWithValue(message)
    }
  }
)

export const getSingleProduct = createAsyncThunk(
  'product/singleProduct',
  async (slug: string | undefined, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/products/${slug}`)
      return response.data.payload
    } catch (error) {
      const message = error.response.message || 'Error fetching data'
      return rejectWithValue(message)
    }
  }
)

export const postProduct = createAsyncThunk(
  'product/postProduct',
  async (product: FormData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseURL}/products/`, product)
      return data
    } catch (err) {
      const message = err.response.data.errors
      return rejectWithValue(message)
    }
  }
)

export const deleteSingleProduct = createAsyncThunk(
  'product/deleteProduct',
  async (slug: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${baseURL}/products/${slug}`)
      return data
    } catch (error) {
      const message = error.response || 'Error delete data'
      return rejectWithValue(message)
    }
  }
)

export const updateSingleProduct = createAsyncThunk(
  'product/updateProduct',
  async (
    payload: { product: FormData | Partial<Product>; slug: string | undefined },
    { rejectWithValue }
  ) => {
    const { product, slug } = payload
    try {
      const { data } = await axios.put(`${baseURL}/products/${slug}`, product)
      return data
    } catch (error) {
      const message = err.response.data.errors
      return rejectWithValue(message)
    }
  }
)
