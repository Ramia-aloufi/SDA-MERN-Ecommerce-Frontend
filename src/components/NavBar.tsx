import { Link } from 'react-router-dom'
import { IoPersonSharp, IoCart, IoHeart } from 'react-icons/io5'
import { useSelector } from 'react-redux'

import SearchInput from './SearchInput'
import { productState } from '../redux/slices/products/productSlice'
import { userState } from '../redux/slices/user/UserSlice'

const NavBar = () => {
  const { totalQuantity } = useSelector(productState)
  const { userData } = useSelector(userState)

  return (
    <nav className="bg-[#434343] w-screen flex p-3 items-center justify-evenly sticky top-0">
      <Link to="/">
        <span className="font-semibold text-2xl text-white logo">ELEC</span>
      </Link>
      <div className="text-sm"></div>
      <SearchInput />
      <div className="flex gap-4 justify-center items-center text-center">
        <Link to="/cart">
          <button className="relative mb-1 items-center text-2xl font-medium text-center text-white">
            <IoCart className="text-center hover:text-[#f88648]" />
            <span className="absolute bottom-3 left-4 items-center justify-center w-4 h-4 text-xs font-semibold text-white bg-[#f88648] rounded-full">
              {totalQuantity}
            </span>
          </button>
        </Link>
        <Link
          to={
            userData?.role == 'admin' ? '/admin' : userData?.role == 'visitor' ? '/user' : '/login'
          }>
          <button className="inline-flex items-center  text-2xl font-medium text-center text-white">
            <IoPersonSharp className="text-center hover:text-[#f88648]" />
          </button>
        </Link>
        <Link
          to={
            userData?.role == 'admin' ? '/admin' : userData?.role == 'visitor' ? '/user' : '/login'
          }>
          <button className="inline-flex items-center text-2xl font-medium text-center text-white ">
            <IoHeart className="text-center hover:text-[#f88648]" />
          </button>
        </Link>
      </div>
    </nav>
  )
}

export default NavBar
