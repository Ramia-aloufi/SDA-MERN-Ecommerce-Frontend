import { Link } from 'react-router-dom'
import { IoPersonSharp, IoCart, IoHeart } from 'react-icons/io5'
import { useSelector } from 'react-redux'

import SearchInput from './SearchInput'
import { productState } from '../redux/slices/products/productSlice'
import { userState } from '../redux/slices/user/userSlice'

const NavBar = () => {
  const { totalQuantity } = useSelector(productState)
  const { userData, isLogedIn } = useSelector(userState)

  return (
    <nav className="bg-[#434343] w-screen flex p-3 md:px-9  items-center justify-between sticky top-0">
      <Link to="/">
        <h1 className="font-semibold text-2xl text-white logo flex items-center">
          ELEC
          <span className="w-3 h-3 bg-[#f88648] rounded-full ml-1"></span>
        </h1>
      </Link>
      <SearchInput />
      <div className="flex md:gap-4 xs:gap-1  justify-center items-center text-center">
        {!userData?.isAdmin && (
          <Link to="/user/cart">
            <button className="relative mb-1 items-center text-2xl font-medium text-center text-white">
              <IoCart className="text-center hover:text-[#f88648]" />
              <span className="absolute bottom-3 left-4 items-center justify-center w-4 h-4 text-xs font-semibold text-white bg-[#f88648] rounded-full">
                {totalQuantity}
              </span>
            </button>
          </Link>
        )}
        <Link to={isLogedIn ? (userData?.isAdmin ? '/admin' : '/user') : '/login'}>
          <button className="inline-flex items-center  text-2xl font-medium text-center text-white">
            <IoPersonSharp className="text-center hover:text-[#f88648]" />
          </button>
        </Link>
        {!userData?.isAdmin && (
          <Link to={isLogedIn ? '/user/savedproduct' : '/login'}>
            <button className="inline-flex items-center text-2xl font-medium text-center text-white ">
              <IoHeart className="text-center hover:text-[#f88648]" />
            </button>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default NavBar
