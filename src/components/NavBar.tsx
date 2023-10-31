import { Link } from 'react-router-dom'
import SearchInput from './SearchInput'
import { IoPersonSharp, IoCart, IoHeart } from 'react-icons/io5'

import { useSelector } from 'react-redux'
import { productState } from '../redux/slices/products/productSlice'

const NavBar = () => {
  const { totalQuantity } = useSelector(productState)

  return (
    <nav className="bg-[#434343] w-screen flex p-3 h-[70x] items-center justify-evenly static z-50">
      <Link to="/">
        <span className="font-semibold text-white">E-COMMERCE</span>
      </Link>
      <div className="text-sm"></div>
      <SearchInput />
      <div className="flex gap-4 justify-center items-center text-center">
        <Link to="/cart">
          <button className="relative mb-1 items-center text-2xl font-medium text-center text-white">
            <IoCart className="text-center" />
            <span className="absolute bottom-3 left-4 items-center justify-center w-4 h-4 text-xs font-semibold text-white bg-[#f88648] rounded-full">
              {totalQuantity}
            </span>
          </button>
        </Link>
        <Link to="/login">
          <button className="inline-flex items-center  text-2xl font-medium text-center text-white">
            <IoPersonSharp className="text-center" />
          </button>
        </Link>
        <Link to="/login">
          <button className="inline-flex items-center text-2xl font-medium text-center text-white ">
            <IoHeart />
          </button>
        </Link>
      </div>
    </nav>
  )
}

export default NavBar
