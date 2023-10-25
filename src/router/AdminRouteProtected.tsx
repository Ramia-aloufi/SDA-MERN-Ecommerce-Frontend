import React from 'react'
import { useSelector } from 'react-redux'
import { userState } from '../redux/slices/user/UserSlice'
import { Outlet } from 'react-router-dom'
import LoginForm from '../components/LoginForm'

const AdminRouteProtected = () => {
  const { isLogedIn, userData } = useSelector(userState)

  return isLogedIn && userData?.role == 'admin' ? <Outlet /> : <LoginForm />
}

export default AdminRouteProtected
