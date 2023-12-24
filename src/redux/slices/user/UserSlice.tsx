import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../store'
import {
  banStatus,
  deleteSingleUser,
  fetchUser,
  login,
  logout,
  postUser,
  roleStatus,
  updateUser
} from '../../../Servies/user'
import { Order } from '../Order/orderSlice'
import axios from 'axios'

axios.defaults.withCredentials = true
export type User = {
  _id: string
  username: string
  slug: string
  email: string
  password: string
  image?: string
  orders: Order['buyer'][]
  address: string
  phone: string
  isAdmin: boolean
  isBanned: boolean
  createdAt?: Date
  updatedAt?: Date
  __v: number
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
  status: string | null
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
  searchedResult: [],
  status: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    searchUser: (state, action) => {
      console.log(action.payload)
      state.searchTerm = action.payload
      state.searchedResult = state.searchTerm
        ? state.items.filter((user) =>
            user.username.toLowerCase().includes(state.searchTerm.toLowerCase())
          )
        : []
      state.users = state.searchedResult.length > 0 ? state.searchedResult : state.items
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload.payload
        state.status = action.payload.message
        state.users = state.items
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLogedIn = true
        state.userData = action.payload.payload
        state.status = action.payload.message
        console.log(action.payload)
        localStorage.setItem(
          'LoginData',
          JSON.stringify({
            isLogedIn: state.isLogedIn,
            userData: state.userData
          })
        )
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLogedIn = false
        state.userData = null
        state.status = action.payload.message
        localStorage.setItem(
          'LoginData',
          JSON.stringify({
            isLogedIn: state.isLogedIn,
            userData: state.userData
          })
        )
      })
      .addCase(postUser.fulfilled, (state, action) => {
        state.status = action.payload.message
        state.items.push(action.payload.payload)
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload.payload
        const existUser = state.items.find((user) => user._id == updatedUser._id)
        if (existUser) {
          state.userData = action.payload.payload
          state.users = state.items
          localStorage.setItem(
            'LoginData',
            JSON.stringify({
              isLogedIn: state.isLogedIn,
              userData: state.userData
            })
          )
        }
      })
      .addCase(banStatus.fulfilled, (state, action) => {
        const { message, payload } = action.payload
        console.log('payload', payload)
        console.log('message', message)
        state.status = message
        const existUser = state.items.find((user) => user._id == payload._id)
        if (existUser) {
          existUser.isAdmin = !existUser.isAdmin
          state.users = state.items
          state.userData = existUser
          localStorage.setItem(
            'LoginData',
            JSON.stringify({
              isLogedIn: state.isLogedIn,
              userData: state.userData
            })
          )
        }
      })
      .addCase(roleStatus.fulfilled, (state, action) => {
        const { payload, message } = action.payload
        console.log('updatedUser', payload)
        state.items = state.items.map((user) => (user.slug == payload.slug ? payload : user))
        state.status = message
        state.userData = payload
        state.users = state.items
        localStorage.setItem(
          'LoginData',
          JSON.stringify({
            isLogedIn: state.isLogedIn,
            userData: state.userData
          })
        )
      })
      .addCase(deleteSingleUser.fulfilled, (state, action) => {
        const { payload, message } = action.payload
        state.isLoading = false
        state.items = state.items.filter((category) => category.slug != String(payload.slug))
        state.users = state.items
        state.status = message
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
          state.error = action.payload || 'An error occurred.'
          console.log(state.error)
        }
      )
  }
})

export const userState = (state: RootState) => state.users
export const { searchUser } = userSlice.actions

export default userSlice.reducer
