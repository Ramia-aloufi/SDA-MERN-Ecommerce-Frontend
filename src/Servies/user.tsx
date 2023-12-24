import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { baseURL } from '../api'
import { User } from '../redux/slices/user/userSlice'
export const fetchUser = createAsyncThunk('user/fetchData', async () => {
  try {
    const response = await axios.get(`${baseURL}/users`)
    return response.data
  } catch (error) {
    const message = error.response.data.errors
    return message
  }
})
export const postUser = createAsyncThunk(
  'user/postData',
  async (user: { username: string; password: string; email: string }) => {
    try {
      const { data } = await axios.post(`${baseURL}/users/register`, user)
      return data
    } catch (error) {
      const message = error.response.data.errors
      return message
    }
  }
)
export const activateUser = async (token: string) => {
  try {
    const { data } = await axios.post(`${baseURL}/users/activate`, { token: token })
    return data.message
  } catch (error) {
    const message = error.response.data.errors
    return message
  }
}
export const login = createAsyncThunk(
  'user/login',
  async (user: { email: string; password: string }) => {
    try {
      console.log('login')
      const { data } = await axios.post(`${baseURL}/auth/login`, user)
      return data
    } catch (error) {
      const message = error.response.data.errors
      return message
    }
  }
)
export const logout = createAsyncThunk('user/logout', async () => {
  try {
    const { data } = await axios.post(`${baseURL}/auth/logout`)
    return data
  } catch (error) {
    const message = error.response.data.errors
    return message
  }
})
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (payload: { user: Partial<User>; slug: string }) => {
    try {
      const { user, slug } = payload
      const { data } = await axios.put(`${baseURL}/users/${slug}`, user)
      return data
    } catch (error) {
      const message = error.response.data.errors
      return message
    }
  }
)
export const banStatus = createAsyncThunk('user/banStatus', async (user: Partial<User>) => {
  try {
    const isBanned = user.isBanned ? 'unban' : 'ban'
    const { data } = await axios.put(`${baseURL}/users/${isBanned}/${user._id}`)
    console.log(data)
    return data
  } catch (error) {
    const message = error.response.data.errors
    return message
  }
})
