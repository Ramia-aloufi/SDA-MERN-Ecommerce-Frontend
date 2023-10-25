import { Link } from 'react-router-dom'

const NavBar = () => {
  // const navigate = useNavigate()
  return (
    <nav className="bg-slate-500 w-screen flex p-3 items-center justify-between">
      <Link to="/">
        <span className="font-semibold">E-COMMERCE</span>
      </Link>
      <div className="text-sm"></div>
      <input
        autoComplete="false"
        type="search"
        className="p-2 rounded-md w-1/3"
        name="search"
        placeholder="Search by product name"
        id=""
      />
      <Link to="/login">
        <button>login</button>
      </Link>
    </nav>
  )
}

export default NavBar
