import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseURL } from '../api'
import { Category } from '../redux/slices/categories/categorySlice'

export const fetchCategory = createAsyncThunk('category/fetchData', async () => {
  const response = await axios.get(`${baseURL}/categories`)
  const data: Category[] = await response.data.payload
  return data
})

export const postCategory = async (title: string) => {
  console.log(title)
  const response = await axios.post(`${baseURL}/categories`, { title: title })
  console.log(response)
  const data = response.data.message
  fetchCategory()
  return data
}
