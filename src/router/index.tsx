import { Outlet, createBrowserRouter } from 'react-router-dom'

import Home from '../pages/Home'
import { AdminPage } from '../pages/AdminPage'
import { NotFound } from '../pages/Error'
import { Category } from '../components/admin/category/Category'
import { Products } from '../components/admin/product/Products'
import UserPage from '../pages/UserPage'
import ProtectedRoute from './ProtectedRoute'
import AdminRouteProtected from './AdminRouteProtected'
import NavBar from '../components/NavBar'
import { Footer } from '../components/Footer'
import ProductDetails from '../pages/ProductDetails'
import { Order } from '../components/admin/order/Order'
import User from '../components/admin/user/User'
import AddCategotyForm from '../components/admin/category/AddCategotyForm'
import UpdateCategoryForm from '../components/admin/category/UpdateCategoryForm'
import { ProductForm } from '../components/admin/product/ProductForm'
import UpdateProductForm from '../components/admin/product/UpdateProductForm'
import CartPage from '../pages/CartPage'
import LoginSignupPage from '../pages/LoginSignupPage'

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
        path: 'cart',
        element: <CartPage />
      },
      {
        path: '/login',
        element: <LoginSignupPage />
      },
      {
        path: '/admin',
        element: <AdminRouteProtected />,
        children: [
          {
            path: '/admin',
            element: <AdminPage />
          },
          {
            path: 'category',
            element: <Category />
          },
          {
            path: 'category/new',
            element: <AddCategotyForm />
          },
          {
            path: 'category/update/:id',
            element: <UpdateCategoryForm />
          },
          {
            path: 'product',
            element: <Products />
          },
          {
            path: 'order',
            element: <Order />
          },
          {
            path: 'users',
            element: <User />
          },
          {
            path: 'product/new',
            element: <ProductForm />
          },
          {
            path: 'product/update/:product',
            element: <UpdateProductForm />
          }
        ]
      },

      {
        path: '/user',
        element: <ProtectedRoute />,
        children: [
          {
            path: '/user',
            element: <UserPage />
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
