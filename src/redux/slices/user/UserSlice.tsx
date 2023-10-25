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
}

export type userState = {
  items: User[]
  error: null | string
  isLoading: boolean
  isLogedIn: boolean
  userData: User | null
}

const initialState: userState = {
  items: [],
  error: null,
  isLoading: false,
  isLogedIn: false,
  userData: null
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
    },
    logOut: (state) => {
      state.isLogedIn = true
      state.userData = null
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
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'An error occurred.'
      })
  }
})

export const userState = (state: RootState) => state.users
export const { logIn } = userSlice.actions

export default userSlice.reducer
