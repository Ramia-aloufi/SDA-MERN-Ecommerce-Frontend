import { createSlice } from '@reduxjs/toolkit'

import {
  activateUser,
  banStatus,
  deleteSingleUser,
  fetchUser,
  forgotPassword,
  login,
  logout,
  postUser,
  resetPassword,
  roleStatus,
  updateUser
} from '../../../Servies/user'
import axios from 'axios'
import userState from '../../../models/UserStateType'

axios.defaults.withCredentials = true

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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    searchUser: (state, action) => {
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
        const { payload, message } = action.payload
        state.isLoading = false
        state.items = payload
        state.status = message
        state.users = state.items
      })
      .addCase(login.fulfilled, (state, action) => {
        const { payload, message } = action.payload
        state.isLogedIn = true
        state.userData = payload
        state.status = message
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
        try{
          localStorage.removeItem('LoginData')
          // localStorage.clear()
        // localStorage.setItem(
        //   'LoginData',
        //   JSON.stringify({
        //     isLogedIn: state.isLogedIn,
        //     userData: state.userData
        //   })
        // )
        console.log('localStorage set successfully');
      } catch (error) {
        console.error('Error setting localStorage:', error);
      }
      })
      .addCase(postUser.fulfilled, (state, action) => {
        const { payload, message } = action.payload
        state.status = message
        state.items.push(payload)
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const { payload, message } = action.payload
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
      .addCase(banStatus.fulfilled, (state, action) => {
        const { message, payload } = action.payload
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
      .addCase(forgotPassword.fulfilled, (state, action) => {
        const { message } = action.payload
        state.isLoading = false
        state.status = message
      })
      .addCase(activateUser.fulfilled, (state, action) => {
        const { message } = action.payload
        state.isLoading = false
        state.status = message
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        const { message } = action.payload
        state.isLoading = false
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
          state.error = action.payload.response.data.errors.message || 'An error occurred.'
          state.status = null
        }
      )
  }
})

export const { searchUser } = userSlice.actions

export default userSlice.reducer
