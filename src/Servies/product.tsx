import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { baseURL } from '../api'
import { showToast } from '../helper/toast'

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
export const fetchProduct = createAsyncThunk('product/fetchData', async () => {
  try {
    const response = await axios.get(`${baseURL}/products`)
    const data = response.data.payload
    return data
  } catch (err) {
    showToast(`${err}`, false)
  }
})

export const getSingleProduct = createAsyncThunk(
  'product/singleProduct',
  async (slug: string | undefined) => {
    try {
      const response = await axios.get(`${baseURL}/products/${slug}`)
      return response.data.payload
    } catch (error) {
      const message = error.response || 'Error fetching data'
      showToast(message, false)
    }
  }
)

export const postProduct = async (product: FormData) => {
  axios
    .post(`${baseURL}/products/`, product)
    .then((response) => {
      console.log(response)
      const message = response.data.message
      return showToast(message, true)
    })
    .catch((err) => {
      console.log('err', err.response.data.errors[0].message)
      const message = err.response.data.errors[0].message
      return showToast(message, false)
    })
}

export const deleteSingleProduct = createAsyncThunk(
  'product/deleteProduct',
  async (slug: string) => {
    try {
      const response = await axios.delete(`${baseURL}/products/${slug}`)
      fetchProduct()
      showToast(response.data.message, true)
      return slug
    } catch (error) {
      const message = error.response || 'Error delete data'
      showToast(message, false)
    }
  }
)

export const updateSingleProduct = createAsyncThunk(
  'product/updateProduct',
  async (payload: { product: FormData; slug: string | undefined }) => {
    const { product, slug } = payload
    try {
      const response = await axios.put(`${baseURL}/products/${slug}`, product)
      showToast(response.data.message, true)
      return response.data.payload
    } catch (error) {
      const message = error.response?.message || 'Error updating data'
      showToast(message, false)
      // You might want to reject the promise with an error message or value here
    }
  }
)
