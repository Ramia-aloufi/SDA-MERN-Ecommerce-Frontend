import React from 'react'
import { useSelector } from 'react-redux'
import { userState } from '../redux/slices/user/UserSlice'
import { Outlet } from 'react-router-dom'
import LoginForm from '../components/LoginForm'

const ProtectedRoute = () => {
  const { isLogedIn } = useSelector(userState)

  return isLogedIn ? <Outlet /> : <LoginForm />
}

export default ProtectedRoute
