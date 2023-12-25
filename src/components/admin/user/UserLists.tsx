import { useDispatch, useSelector } from 'react-redux'
import { FiTrash } from 'react-icons/fi'
import { FaBan, FaRegCheckCircle } from 'react-icons/fa'

import { User, userState } from '../../../redux/slices/user/userSlice'
import { AppDispatch } from '../../../redux/store'
import { banStatus, deleteSingleUser, roleStatus } from '../../../Servies/user'
import { useEffect } from 'react'
import { showToast } from '../../../helper/toast'

const UserLists = () => {
  const { users, isLoading, error, status } = useSelector(userState)

  const dispatch = useDispatch<AppDispatch>()

  const handleDelete = (slug: string) => {
    dispatch(deleteSingleUser(slug))
  }
  const handleBan = (user: User) => {
    console.log('user', user)
    dispatch(banStatus(user))
  }
  const handleRole = (user: User) => {
    console.log('user', user)
    dispatch(roleStatus(user))
  }

  useEffect(() => {
    if (status) {
      showToast(status, true, dispatch)
    }
    if (error) {
      showToast(error, false, dispatch)
    }
  }, [status, error, users])

  if (isLoading) {
    return <p>Loading Data</p>
  }

  return (
    <table className="min-w-full table-auto text-xs">
      <thead>
        <tr className="bg-[#434343] text-white">
          <th className="border p-2 uppercase">index</th>
          <th className="border p-2 uppercase">Username</th>
          <th className="border p-2 uppercase hidden lg:table-cell">email</th>
          <th className="border p-2 uppercase hidden sm:table-cell">Role</th>
          <th className="border p-2 uppercase">action</th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.map((item, index) => {
            return (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="border p-2">{index}</td>
                <td className="border p-2 hidden lg:table-cell">{item.username}</td>
                <td className="border p-2 hidden sm:table-cell">{item.email}</td>
                <td className="border p-2 ">
                  {' '}
                  <button
                    onClick={() => handleRole(item)}
                    className={!item.isBanned ? 'banBtn' : 'editBtn'}>
                    {item.isAdmin ? 'admin' : 'user'}
                  </button>
                </td>
                <td className="border p-2 grid gap-3 justify-center">
                  <button onClick={() => handleDelete(item.slug)} className="trashBtn">
                    <FiTrash />
                  </button>
                  <button
                    onClick={() => handleBan(item)}
                    className={!item.isBanned ? 'banBtn' : 'editBtn'}>
                    {item.isBanned ? <FaBan /> : <FaRegCheckCircle />}
                  </button>
                </td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

export default UserLists
