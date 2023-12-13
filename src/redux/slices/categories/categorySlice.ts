import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../store'
import { Category } from '../../../components/admin/category/Category'
import axios from 'axios'
import { banUser } from '../user/userSlice'
import { baseURL } from '../../../api'

export type Category = {
  id: number
  name: string
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
export const fetchCategory = createAsyncThunk('category/fetchData', async () => {
  const response = await axios.get(`${baseURL}/categories`)
  const data: Category[] = await response.data
  return data
})

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    searchCategory: (state, action) => {
      console.log(action.payload)
      state.searchTerm = action.payload
      state.searchedResult = state.searchTerm
        ? state.items.filter((category) =>
            category.name.toLowerCase().includes(state.searchTerm.toLowerCase())
          )
        : state.items
      state.categories = state.searchedResult.length > 0 ? state.searchedResult : state.items
    },
    deleteCategory: (state, action) => {
      const id = action.payload
      console.log(id)
      state.items = state.items.filter((user) => user.id !== id)
      state.categories = state.items
      console.log(state.items)
    },
    addCategory: (state, action) => {
      const id = state.items.length + 1
      const name = action.payload
      console.log(`name:${name}`)
      const newCategory: Category = { id, name }
      console.log(`newCategory:${newCategory}`)
      state.items = [...state.items, newCategory]
      state.categories = state.items
    },
    UpdateCategory: (state, action) => {
      const updatedUser: Category = action.payload
      console.log(`updatedUser: ${updatedUser.id} ${updatedUser.name}`)
      const existUser = state.items.find((category) => category.id == updatedUser.id)
      if (existUser) {
        existUser.name = updatedUser.name
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
