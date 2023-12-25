import './App.css'

import { RouterProvider } from 'react-router-dom'

import { router } from './router/index'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './redux/store'
import { useEffect } from 'react'
import { fetchUser } from './Servies/user'
import { fetchProduct } from './Servies/product'
import { fetchCategory } from './Servies/category'
import { fetchOrder } from './Servies/order'

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
