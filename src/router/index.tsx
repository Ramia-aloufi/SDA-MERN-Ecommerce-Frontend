import { Outlet, createBrowserRouter } from 'react-router-dom'

import Home from '../pages/Home'
import { AdminPage } from '../pages/AdminPage'
import { NotFound } from '../pages/Error'
import { Category } from '../components/admin/category/Category'
import { Products } from '../components/admin/product/Products'
import { AddNewProduct } from '../pages/AddNewProduct'
import User from '../components/admin/user/User'
import LoginForm from '../components/LoginForm'
import ProtectedRoute from './ProtectedRoute'
import AdminRouteProtected from './AdminRouteProtected'
import NavBar from '../components/NavBar'
import { Footer } from '../components/Footer'
import ProductDetails from '../pages/ProductDetails'

// function Index() {
//   // const count = useSelector((state: RootState) => state.counter.value)
//   // const dispatch = useDispatch()
//   return (
//     <>
//       <NavBar />
//       <App />
//       <Footer />
//     </>
//   )
// }
function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  )
}

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <LoginForm />
      },
      {
        path: '/admin',
        element: <AdminRouteProtected />,
        children: [
          {
            path: 'admin',
            element: <AdminPage />
          },
          {
            path: 'category',
            element: <Category />
          },
          {
            path: 'product',
            element: <Products />
          },
          {
            path: 'users',
            element: <User />
          },
          {
            path: 'product/new',
            element: <AddNewProduct />
          }
        ]
      },

      {
        path: '/user',
        element: <ProtectedRoute />,
        children: [
          {
            path: 'user',
            element: <User />
          }
        ]
      },
      {
        path: '*',
        element: <NotFound />
      },
      {
        path: '/product/:id',
        element: <ProductDetails />
      }
    ]
  }
])

export default Layout
