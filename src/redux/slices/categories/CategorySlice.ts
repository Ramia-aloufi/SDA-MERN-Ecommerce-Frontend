import { createSlice } from '@reduxjs/toolkit'

import {
  deleteSingleCategory,
  fetchCategory,
  getSingleCategory,
  postCategory,
  updateSingleCategory
} from '../../../Servies/category'
import Category from '../../../models/Category'

type CategoryState = {
  items: Category[]
  categories: Category[]
  singleCategory: Category | null
  error: null | string
  isLoading: boolean
  searchTerm: string
  searchedResult: Category[]
  status: null | string
}

const initialState: CategoryState = {
  items: [],
  categories: [],
  singleCategory: null,
  error: null,
  isLoading: false,
  searchTerm: '',
  searchedResult: [],
  status: null
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    searchCategory: (state, action) => {
      state.searchTerm = action.payload
      state.searchedResult = state.searchTerm
        ? state.items.filter((category) =>
            category.title.toLowerCase().includes(state.searchTerm.toLowerCase())
          )
        : state.items
      state.categories = state.searchedResult.length > 0 ? state.searchedResult : state.items
    },
    clearError: (state) => {
      state.error = null
      state.status = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.fulfilled, (state, action) => {
        const { payload, message } = action.payload
        state.isLoading = false
        state.items = payload
        state.categories = state.items
        state.status = message
      })
      .addCase(postCategory.fulfilled, (state, action) => {
        state.isLoading = false
        const product = action.payload.payload
        state.items.push(product)
        state.categories = state.items
        state.status = action.payload.message
      })
      .addCase(getSingleCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.singleCategory = action.payload.payload
      })
      .addCase(deleteSingleCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = state.items.filter(
          (category) => category.slug != String(action.payload.payload.slug)
        )
        state.categories = state.items
        state.status = action.payload.message
      })
      .addCase(updateSingleCategory.fulfilled, (state, action) => {
        const updatedUser = action.payload.payload
        state.items = state.items.map((category) =>
          category._id === updatedUser._id ? updatedUser : category
        )
        state.categories = state.items
      })

      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true
        }
      )

      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.isLoading = false
          state.error = ''
        }
      )

      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false
          state.error = action.payload.response.data.errors.message || 'An error occurred.'
          state.status = null
        }
      )
  }
})

export const { searchCategory } = categorySlice.actions

export default categorySlice.reducer
