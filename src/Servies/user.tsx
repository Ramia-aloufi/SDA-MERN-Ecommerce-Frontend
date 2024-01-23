import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { baseURL } from '../api'
import { QueryParams } from '../redux/slices/products/productSlice'
import User from '../models/User'

export const fetchUser = createAsyncThunk(
  'user/fetchData',
  async (query: Partial<QueryParams> | undefined, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${baseURL}/users${query?.search ? `?search=${query.search}` : ''}`
      )
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const postUser = createAsyncThunk(
  'user/postData',
  async (user: { username: string; password: string; email: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseURL}/users/register`, user)
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const activateUser = createAsyncThunk(
  'user/activateUser',
  async (token: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseURL}/users/activate`, { token: token })
      return data.message
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const login = createAsyncThunk(
  'user/login',
  async (user: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseURL}/auth/login`, user)
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const logout = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${baseURL}/auth/logout`)
    return data
  } catch (error) {
    return rejectWithValue(error)
  }
})
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (payload: { user: FormData | Partial<User>; slug: string }, { rejectWithValue }) => {
    try {
      const { user, slug } = payload
      const { data } = await axios.put(`${baseURL}/users/${slug}`, user)
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const banStatus = createAsyncThunk(
  'user/banStatus',
  async (user: Partial<User>, { rejectWithValue }) => {
    try {
      const isBanned = user.isBanned ? 'unban' : 'ban'
      const { data } = await axios.put(`${baseURL}/users/${isBanned}/${user._id}`)
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const deleteSingleUser = createAsyncThunk(
  'user/deleteUser',
  async (slug: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${baseURL}/users/${slug}`)
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const roleStatus = createAsyncThunk(
  'user/roleStatus',
  async (user: User, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${baseURL}/users/role/${user.slug}`, {
        isAdmin: !user.isAdmin
      })
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseURL}/users/forgot-password`, { email: email })
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (payload: { password: string; token: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseURL}/users/reset-password`, payload)
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
