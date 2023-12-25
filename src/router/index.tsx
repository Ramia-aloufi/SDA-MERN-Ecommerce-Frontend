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
import SavedProduct from '../pages/SavedProduct'
import Activate from '../components/Activate'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'
import orderDetils from '../components/user/userOrder'
import OrderDetils from '../components/user/userOrder'
import { OrderUser } from '../components/user/Order'

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
    <div className="flex flex-col h-screen">
      <div className="h-16">
        <NavBar />
      </div>

      <div className="flex-1">
        <Outlet />
      </div>

      <div className="h-14">
        <Footer />
      </div>
    </div>
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
        element: <LoginSignupPage />
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />
      },
      {
        path: '/reset-password/:token',
        element: <ResetPassword />
      },
      {
        path: '/product/:slug',
        element: <ProductDetails />
      },
      {
        path: 'user/activate/:token',
        element: <Activate />
      },
      {
        path: '*',
        element: <NotFound />
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
            path: 'category/update/:slug',
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
            path: 'product/update/:slug',
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
          },

          {
            path: 'savedproduct',
            element: <SavedProduct />
          },
          {
            path: 'cart',
            element: <CartPage />
          },
          {
            path: 'order/:id',
            element: <OrderUser />
          }
        ]
      }
    ]
  }
])

export default Layout
