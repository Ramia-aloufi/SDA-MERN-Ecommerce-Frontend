import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

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

export default Layout
