import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import api from '../../../api'

export type Category = {
  id: number
  name: string
}

export type CategoryState = {
  items: Category[]
  error: null | string
  isLoading: boolean
}

const initialState: CategoryState = {
  items: [],
  error: null,
  isLoading: false
}
export const fetchCategory = createAsyncThunk('category/fetchData', async () => {
  const response = await api.get('/mock/e-commerce/categories.json')
  if (!response.statusText) {
    throw new Error('Network response error')
  }
  const data: Category[] = await response.data
  return data
})

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    // categoriesRequest: (state) => {
    //   state.isLoading = true
    // },
    // categoriesSuccess: (state, action) => {
    //   state.isLoading = false
    //   state.items = action.payload
    // },
    // addCategories: (state, action: { payload: { product: Category } }) => {
    //   // let's append the new product to the beginning of the array
    //   state.items = [action.payload.product, ...state.items]
    // },
    // removeCategories: (state, action: { payload: { productId: number } }) => {
    //   const filteredItems = state.items.filter((product) => product.id !== action.payload.productId)
    //   state.items = filteredItems
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'An error occurred.'
      })
  }
})
export const categoryState = (state: RootState) => state.categories.items

export default categorySlice.reducer
