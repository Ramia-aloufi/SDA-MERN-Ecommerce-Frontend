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
  products: Product[]
  error: null | string
  isLoading: boolean
  singleProduct: Product
  searchTerm: string
  searchedResult: Product[]
}
const initialState: ProductState = {
  items: [],
  error: null,
  products: [],
  isLoading: false,
  singleProduct: {} as Product,
  searchTerm: '',
  searchedResult: []
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
      const search = action.payload
      state.searchTerm = search
      state.searchedResult = state.searchTerm
        ? state.items.filter((product) =>
            product.name.toLowerCase().includes(state.searchTerm.toLowerCase())
          )
        : []
      state.products = state.searchedResult.length > 0 ? state.searchedResult : state.items
    },
    sortProduct: (state, action) => {
      const sortBy = action.payload
      switch (sortBy) {
        case 'price':
          state.products.sort((a, b) => a.price - b.price)
          break
        case 'name':
          state.products.sort((a, b) => a.name.localeCompare(b.name))
          break
        default:
          state.products
      }
    },
    deleteProduct: (state, action) => {
      const id = action.payload
      console.log(id)
      state.items = state.items.filter((product) => product.id !== id)
      state.products = state.items
      console.log(state.items)
    },
    addProduct: (state, action) => {
      const id = state.items.length + 1
      const name = action.payload
      console.log(`name:${name}`)
      const newProduct: Product = { id, ...name }
      console.log(`newProduct:${newProduct.id}`)
      state.items = [...state.items, newProduct]
      state.products = state.items
      console.log(state.items.length)
    },
    UpdateProduct: (state, action) => {
      const updatedProduct: Product = action.payload
      console.log(`updatedProduct: ${updatedProduct.id} ${updatedProduct.name}`)
      const existUser = state.items.find((category) => category.id == updatedProduct.id)
      if (existUser) {
        existUser.name = updatedProduct.name
        state.products = state.items
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
        state.products = state.items
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'An error occurred.'
      })
  }
})
export const { findById, searchProduct, sortProduct, UpdateProduct, addProduct, deleteProduct } =
  productSlice.actions
export const productState = (state: RootState) => state.products

export default productSlice.reducer
