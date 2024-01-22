import { Outlet } from 'react-router-dom'

import LoginForm from '../components/LoginForm'

const ProtectedRoute = () => {
  const isLogedIn = true

  return isLogedIn ? <Outlet /> : <LoginForm />
}

export default ProtectedRoute
