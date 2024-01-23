import './App.css'

import { RouterProvider } from 'react-router-dom'

import router from './router/router'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchProduct } from './Servies/product'
import { fetchCategory } from './Servies/category'
import AppDispatch from './models/AppDispatch'

function App() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchCategory())
    dispatch(fetchProduct())
  }, [dispatch])
  return <RouterProvider router={router} />
}

export default App
