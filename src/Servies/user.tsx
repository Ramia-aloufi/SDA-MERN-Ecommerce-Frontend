import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseURL } from '../api'
import { User } from '../redux/slices/user/userSlice'
import { showToast } from '../helper/toast'

export const fetchUser = createAsyncThunk('user/fetchData', async () => {
  const response = await axios.get(`${baseURL}/users`)
  const data: User[] = await response.data
  return data
})
export const postUser = async (user: { username: string; password: string; email: string }) => {
  console.log('postUser')
  const response = await axios.post(`${baseURL}/users/register`, user)
  const data = response.data
  fetchUser()
  return data.message
}
export const activateUser = async (token: string) => {
  console.log('postUser', token)
  const response = await axios.post(`${baseURL}/users/activate`, { token: token })
  const data = response.data
  fetchUser()
  return data.message
}
export const login = async (user: { email: string; password: string }) => {
  console.log('login', user)
  await axios
    .post(`${baseURL}/auth/login`, user)
    .then((response) => {
      const message = response.data.message
      showToast(message, true)
    })
    .catch((error) => {
      const message = error.response.data.errors
      showToast(message, false)
    })
}
