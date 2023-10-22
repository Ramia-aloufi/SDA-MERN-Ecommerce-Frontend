import './App.css'

import Index from './router'
import NavBar from './components/NavBar'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Index />
      <Footer />
    </div>
  )
}

export default App
