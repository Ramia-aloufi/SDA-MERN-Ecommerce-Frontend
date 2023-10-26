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
  price: number
}

export type ProductState = {
  items: Product[]
  error: null | string
  isLoading: boolean
  singleProduct: Product
  searchTerm: string
}

const initialState: ProductState = {
  items: [],
  error: null,
  isLoading: false,
  singleProduct: {} as Product,
  searchTerm: ''
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
    findById: (state, action) => {
      const id = action.payload
      const isExist = state.items.find((product) => product.id === id)
      if (isExist) {
        state.singleProduct = isExist
      }
    },
    searchProduct: (state, action) => {
      console.log(action.payload)
      state.searchTerm = action.payload
    },
    sortProduct: (state, action) => {
      const sortBy = action.payload
      switch (sortBy) {
        case 'price':
          state.items.sort((a, b) => a.price - b.price)
          break
        case 'name':
          state.items.sort((a, b) => a.name.localeCompare(b.name))
          break
        default:
          state.items
      }
    }
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
export const { findById, searchProduct, sortProduct } = productSlice.actions
export const productState = (state: RootState) => state.products

export default productSlice.reducer
