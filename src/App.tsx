import './App.css'

import { RouterProvider } from 'react-router-dom'

import { router } from './router/index'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './redux/store'
import { fetchCategory } from './redux/slices/categories/categorySlice'
import { useEffect } from 'react'
import { fetchProduct } from './redux/slices/products/productSlice'
import { fetchUser } from './redux/slices/user/userSlice'
import { fetchOrder } from './redux/slices/Order/orderSlice'

function App() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchCategory())
    dispatch(fetchProduct())
    dispatch(fetchUser())
    dispatch(fetchOrder())
  }, [dispatch])
  return <RouterProvider router={router} />
}

export default App
