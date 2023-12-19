import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../store'
import { Category } from '../../../components/admin/category/Category'
import axios from 'axios'
import { banUser } from '../user/userSlice'
import { baseURL } from '../../../api'
import { fetchCategory } from '../../../Servies/category'

export type Category = {
  _id: number
  title: string
}

export type CategoryState = {
  items: Category[]
  categories: Category[]
  error: null | string
  isLoading: boolean
  searchTerm: string
  searchedResult: Category[]
}

const initialState: CategoryState = {
  items: [],
  categories: [],
  error: null,
  isLoading: false,
  searchTerm: '',
  searchedResult: []
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    searchCategory: (state, action) => {
      console.log(action.payload)
      state.searchTerm = action.payload
      state.searchedResult = state.searchTerm
        ? state.items.filter((category) =>
            category.title.toLowerCase().includes(state.searchTerm.toLowerCase())
          )
        : state.items
      state.categories = state.searchedResult.length > 0 ? state.searchedResult : state.items
    },
    deleteCategory: (state, action) => {
      const id = action.payload
      console.log(id)
      state.items = state.items.filter((user) => user._id !== id)
      state.categories = state.items
      console.log(state.items)
    },
    addCategory: (state, action) => {
      const _id = state.items.length + 1
      const title = action.payload
      console.log(`name:${name}`)
      const newCategory: Category = { _id, title }
      console.log(`newCategory:${newCategory}`)
      state.items = [...state.items, newCategory]
      state.categories = state.items
    },
    UpdateCategory: (state, action) => {
      const updatedUser: Category = action.payload
      console.log(`updatedUser: ${updatedUser._id} ${updatedUser.title}`)
      const existUser = state.items.find((category) => category._id == updatedUser._id)
      if (existUser) {
        existUser.title = updatedUser.title
        state.categories = state.items
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
        state.categories = state.items
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'An error occurred.'
      })
  }
})
export const { searchCategory, deleteCategory, UpdateCategory, addCategory } = categorySlice.actions

export const categoryState = (state: RootState) => state.categories

export default categorySlice.reducer
