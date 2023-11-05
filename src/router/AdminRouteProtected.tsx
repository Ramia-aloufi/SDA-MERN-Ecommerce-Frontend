import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

import { userState } from '../redux/slices/user/userSlice'
import LoginSignupPage from '../pages/LoginSignupPage'

const AdminRouteProtected = () => {
  const { isLogedIn, userData } = useSelector(userState)

  return isLogedIn && userData?.role == 'admin' ? <Outlet /> : <LoginSignupPage />
}

export default AdminRouteProtected
