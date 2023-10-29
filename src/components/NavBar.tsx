import { Link } from 'react-router-dom'
import SearchInput from './SearchInput'

const NavBar = () => {
  return (
    <nav className="bg-slate-500 w-screen flex p-3 items-center justify-between">
      <Link to="/">
        <span className="font-semibold">E-COMMERCE</span>
      </Link>
      <div className="text-sm"></div>
      <SearchInput />
      <Link to="/login">
        <button>login</button>
      </Link>
    </nav>
  )
}

export default NavBar
