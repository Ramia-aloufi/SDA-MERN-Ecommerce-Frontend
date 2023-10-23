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
}

const initialState: userState = {
  items: [],
  error: null,
  isLoading: false
}
export const fetchData = createAsyncThunk('user/fetchData', async () => {
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'An error occurred.'
      })
  }
})

export const selectUser = (state: RootState) => state.users

export default userSlice.reducer
