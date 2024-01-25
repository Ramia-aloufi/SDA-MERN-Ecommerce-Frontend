import './App.css'

import { RouterProvider } from 'react-router-dom'

import router from './router/router'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchProduct } from './Servies/product'
import { fetchCategory } from './Servies/category'
import AppDispatch from './models/AppDispatch'
import { getUserData } from './Servies/user'

function App() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchCategory())
    dispatch(fetchProduct())
    dispatch(getUserData())
  }, [dispatch])
  return <RouterProvider router={router} />
}

export default App
