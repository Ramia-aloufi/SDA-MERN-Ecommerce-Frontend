import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../../api'
import { RootState } from '../../store'

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  ban: boolean
}

export type userState = {
  items: User[]
  users: User[]
  error: null | string
  isLoading: boolean
  isLogedIn: boolean
  userData: User | null
  searchTerm: string
  searchedResult: User[]
}

const data =
  localStorage.getItem('LoginData') != null
    ? JSON.parse(String(localStorage.getItem('LoginData')))
    : []
const initialState: userState = {
  items: [],
  users: [],
  error: null,
  isLoading: false,
  isLogedIn: data.isLogedIn,
  userData: data.userData,
  searchTerm: '',
  searchedResult: []
}

export const fetchUser = createAsyncThunk('user/fetchData', async () => {
  const response = await api.get('/mock/e-commerce/users.json')
  if (!response.statusText) {
    throw new Error('Network response error')
  }
  const data: User[] = await response.data
  return data
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.isLogedIn = true
      state.userData = action.payload
      localStorage.setItem(
        'LoginData',
        JSON.stringify({
          isLogedIn: state.isLogedIn,
          userData: state.userData
        })
      )
    },
    logOut: (state) => {
      state.isLogedIn = false
      state.userData = null
      localStorage.setItem(
        'LoginData',
        JSON.stringify({
          isLogedIn: state.isLogedIn,
          userData: state.userData
        })
      )
    },
    searchUser: (state, action) => {
      console.log(action.payload)
      state.searchTerm = action.payload
      state.searchedResult = state.searchTerm
        ? state.items.filter((user) =>
            user.firstName.toLowerCase().includes(state.searchTerm.toLowerCase())
          )
        : []
      state.users = state.searchedResult.length > 0 ? state.searchedResult : state.items
    },
    deleteUser: (state, action) => {
      const id = action.payload
      console.log(id)
      state.items = state.items.filter((user) => user.id !== id)
      state.users = state.items
      console.log(state.items)
    },
    addUser: (state, action) => {
      state.items = [action.payload.product, ...state.items]
      state.users = state.items
    },
    UpdateUser: (state, action) => {
      const updatedUser = action.payload
      const existUser = state.items.find((user) => user.id == updatedUser.id)
      if (existUser) {
        existUser.firstName = updatedUser.firstName
        existUser.lastName = updatedUser.lastName
        state.users = state.items
      }
    },
    banUser: (state, action) => {
      const updatedUser = action.payload
      console.log(updatedUser.ban)
      const existUser = state.items.find((user) => user.id == updatedUser.id)
      if (existUser) {
        existUser.ban = !existUser.ban
        state.users = state.items
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
        state.users = state.items
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'An error occurred.'
      })
  }
})

export const userState = (state: RootState) => state.users
export const { logIn, logOut, searchUser, deleteUser, banUser, addUser, UpdateUser } =
  userSlice.actions

export default userSlice.reducer
