import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppDispatch } from '../redux/store'
import { productState, searchProduct } from '../redux/slices/products/productSlice'
import { ChangeEvent } from 'react'

const NavBar = () => {
  // const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { searchTerm } = useSelector(productState)
  const handeChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchProduct(e.target.value))
  }

  return (
    <nav className="bg-slate-500 w-screen flex p-3 items-center justify-between">
      <Link to="/">
        <span className="font-semibold">E-COMMERCE</span>
      </Link>
      <div className="text-sm"></div>
      <input
        value={searchTerm}
        autoComplete="false"
        type="search"
        onChange={handeChange}
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
