import './App.css'

import Index from './router'
import NavBar from './components/NavBar'
import { Footer } from './components/Footer'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/index'

function App() {
  return <RouterProvider router={router} />
}

export default App
