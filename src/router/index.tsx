import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import { AdminPage } from '../pages/AdminPage'
import { NotFound } from '../pages/Error'
import { Category } from '../components/admin/category/Category'
import { Products } from '../components/admin/product/Products'
import { AddNewProduct } from '../pages/AddNewProduct'
import User from '../components/admin/user/User'

function Index() {
  // const count = useSelector((state: RootState) => state.counter.value)
  // const dispatch = useDispatch()

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/admin',
      element: <AdminPage />
    },
    {
      path: '/admin/category',
      element: <Category />
    },
    {
      path: '/admin/product',
      element: <Products />
    },
    {
      path: '/admin/users',
      element: <User />
    },
    {
      path: '/admin/product/new',
      element: <AddNewProduct />
    },
    {
      path: '/user',
      element: <User />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])

  return <RouterProvider router={router} />
}

export default Index