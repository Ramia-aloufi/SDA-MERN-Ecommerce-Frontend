import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { baseURL } from '../api'
import { QueryParams } from '../redux/slices/products/productSlice'

export const fetchCategory = createAsyncThunk(
  'category/fetchData',
  async (query: Partial<QueryParams> | undefined, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${baseURL}/categories${query?.search ? `?search=${query.search}` : ''}`
      )
      return data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)
export const postCategory = createAsyncThunk(
  'category/postCategory',
  async (title: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseURL}/categories`, { title: title })
      return data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)
export const getSingleCategory = createAsyncThunk(
  'category/singleCategory',
  async (slug: string | undefined, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseURL}/categories/${slug}`)
      return data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)
export const deleteSingleCategory = createAsyncThunk(
  'category/deleteCategory',
  async (slug: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${baseURL}/categories/${slug}`)
      return data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)
export const updateSingleCategory = createAsyncThunk(
  'category/updateCategory',
  async (payload: { title: string; slug: string | undefined }, { rejectWithValue }) => {
    const { title, slug } = payload
    try {
      const { data } = await axios.put(`${baseURL}/categories/${slug}`, { title: title })
      return data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)
