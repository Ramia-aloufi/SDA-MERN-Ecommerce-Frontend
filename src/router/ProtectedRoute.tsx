import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

import { userState } from '../redux/slices/user/userSlice'
import LoginForm from '../components/LoginForm'

const ProtectedRoute = () => {
  const { isLogedIn } = useSelector(userState)

  return isLogedIn ? <Outlet /> : <LoginForm />
}

export default ProtectedRoute
