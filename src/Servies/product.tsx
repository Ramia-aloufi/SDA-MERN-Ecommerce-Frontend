import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { baseURL } from '../api'
import Product from '../models/Product'
import QueryParams from '../models/QueryParams'

export type apiResponse = {
  message: string
  success: boolean
}
export const fetchProduct = createAsyncThunk(
  'product/fetchData',
  async (query: Partial<QueryParams> | undefined, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${baseURL}/products/?page=${query?.page}${
          query?.categoryId ? `&categoryId=${query.categoryId}` : ''
        }${query?.maxPrice ? `&maxPrice=${query.maxPrice}` : ''}
        ${query?.minPrice ? `&minPrice=${query.minPrice}` : ''}
        ${query?.sort ? `&sort=${query.sort}` : ''}
        ${query?.search ? `&search=${query.search}` : ''}`
      )
      return data
    } catch (error) {
      return rejectWithValue(error)
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
      return rejectWithValue(error)
    }
  }
)

export const postProduct = createAsyncThunk(
  'product/postProduct',
  async (product: FormData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseURL}/products/`, product)
      return data
    } catch (error) {
      return rejectWithValue(error)
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
      return rejectWithValue(error)
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
      return rejectWithValue(error)
    }
  }
)
