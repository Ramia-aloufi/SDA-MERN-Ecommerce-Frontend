import { Outlet } from 'react-router-dom'

import LoginSignupPage from '../pages/LoginSignupPage'

const AdminRouteProtected = () => {
  const isLogedIn = true
  const userData = { role: 'admin' }

  return isLogedIn && userData?.role == 'admin' ? <Outlet /> : <LoginSignupPage />
}

export default AdminRouteProtected
