import { createSlice } from '@reduxjs/toolkit'

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

export const categorySlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    categoriesRequest: (state) => {
      state.isLoading = true
    },
    categoriesSuccess: (state, action) => {
      state.isLoading = false
      state.items = action.payload
    },
    addCategories: (state, action: { payload: { product: Category } }) => {
      // let's append the new product to the beginning of the array
      state.items = [action.payload.product, ...state.items]
    },
    removeCategories: (state, action: { payload: { productId: number } }) => {
      const filteredItems = state.items.filter((product) => product.id !== action.payload.productId)
      state.items = filteredItems
    }
  }
})

export const { categoriesRequest, categoriesSuccess, addCategories, removeCategories } =
  categorySlice.actions

export default categorySlice.reducer
