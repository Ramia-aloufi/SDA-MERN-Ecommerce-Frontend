import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { IoLogOutOutline, IoAddCircleSharp } from 'react-icons/io5'

import { AppDispatch } from '../../redux/store'
import { userState } from '../../redux/slices/user/userSlice'
import { logout, updateUser } from '../../Servies/user'
import { baseURL } from '../../api'
import { ChangeEvent, useRef } from 'react'
import { updateSingleProduct } from '../../Servies/product'

export const AdminSidbar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { userData } = useSelector(userState)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const userLogout = () => {
    dispatch(logout())
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files[0]
    console.log('Selected file:', selectedFile)
    const user = new FormData()
    console.log(userData)
    if (userData) {
      user.append('username', userData.username)
      user.append('image', selectedFile)
      user.append('email', userData.email)
      user.append('password', userData.password)
      dispatch(updateUser({ user, slug: userData.slug }))
    }
  }

  const handleClickIcon = () => {
    if (fileInputRef) {
      fileInputRef.current.click()
    }
  }

  return (
    <aside className="h-full z-0 bg-[#434343] text-white border-y border-white flex flex-col items-center justify-evenly p-1">
      <Link to="/admin">
        <div className="grid place-items-center">
          <h1 className="font-semibold mb-4">Admin Dashboard</h1>
          <span>{userData?.username}</span>
        </div>
      </Link>
      <input
        type="file"
        id="fileInput"
        name="image"
        hidden
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      <img
        className="h-28 rounded-full mb-6 cursor-pointer"
        src={`${baseURL}/${userData ? userData.image : 'default.png'}`}
        alt=""
        onClick={handleClickIcon}
      />
      <div className="text-center  flex flex-col gap-7 text-sm">
        <Link to="/admin/category"> Category</Link>
        <Link to="/admin/product"> Products</Link>
        <Link to="/admin/order"> Order</Link>
        <Link to="/admin/users"> Users</Link>
      </div>
      <Link to="/">
        <button className="btn flex justify-center items-center gap-2" onClick={userLogout}>
          Sign Out <IoLogOutOutline className="text-lg" />
        </button>
      </Link>
    </aside>
  )
}
