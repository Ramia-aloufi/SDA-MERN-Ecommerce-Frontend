import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import api from '../../../api'

export type Product = {
  id: number
  name: string
  image: string
  description: string
  categories: number[]
  variants: string[]
  sizes: string[]
}

export type ProductState = {
  items: Product[]
  error: null | string
  isLoading: boolean
}

const initialState: ProductState = {
  items: [],
  error: null,
  isLoading: false
}

export const fetchProduct = createAsyncThunk('product/fetchData', async () => {
  const response = await api.get('/mock/e-commerce/products.json')
  if (!response.statusText) {
    throw new Error('Network response error')
  }
  const data: Product[] = await response.data
  return data
})

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // productsRequest: (state) => {
    //   state.isLoading = true
    // },
    // productsSuccess: (state, action) => {
    //   state.isLoading = false
    //   state.items = action.payload
    // },
    // addProduct: (state, action: { payload: { product: Product } }) => {
    //   // let's append the new product to the beginning of the array
    //   state.items = [action.payload.product, ...state.items]
    // },
    // removeProduct: (state, action: { payload: { productId: number } }) => {
    //   const filteredItems = state.items.filter((product) => product.id !== action.payload.productId)
    //   state.items = filteredItems
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'An error occurred.'
      })
  }
})
export const productState = (state: RootState) => state.products

export default productSlice.reducer
