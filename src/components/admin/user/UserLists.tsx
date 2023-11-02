import { useDispatch, useSelector } from 'react-redux'
import { FiTrash } from 'react-icons/fi'
import { FaBan, FaRegCheckCircle } from 'react-icons/fa'

import { User, banUser, deleteUser, userState } from '../../../redux/slices/user/UserSlice'
import { AppDispatch } from '../../../redux/store'

const UserLists = () => {
  const { users, isLoading, error } = useSelector(userState)
  const dispatch = useDispatch<AppDispatch>()

  const handleDelete = (id: number) => {
    dispatch(deleteUser(Number(id)))
  }
  const handleBan = (user: User) => {
    dispatch(banUser(user))
  }

  if (isLoading) {
    return <p>Loading Data</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  return (
    <table className="min-w-full table-auto text-xs">
      <thead>
        <tr className="bg-[#434343] text-white">
          <th className="border p-2 uppercase">Id</th>
          <th className="border p-2 uppercase">firstName</th>
          <th className="border p-2 uppercase hidden lg:table-cell">lastName</th>
          <th className="border p-2 uppercase hidden sm:table-cell">email</th>
          <th className="border p-2 uppercase ">role</th>
          <th className="border p-2 uppercase hidden md:table-cell">password</th>
          <th className="border p-2 uppercase">action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((item, index) => {
          return (
            <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
              <td className="border p-2">{item.id}</td>
              <td className="border p-2">{item.firstName}</td>
              <td className="border p-2 hidden lg:table-cell">{item.lastName}</td>
              <td className="border p-2 hidden sm:table-cell">{item.email}</td>
              <td className="border p-2 ">{item.role}</td>
              <td className="border p-2 hidden md:table-cell">{item.password}</td>
              <td className="border p-2 grid gap-3 justify-center">
                <button onClick={() => handleDelete(item.id)} className="trashBtn">
                  <FiTrash />
                </button>
                <button
                  onClick={() => handleBan(item)}
                  className={!item.ban ? 'banBtn' : 'editBtn'}>
                  {item.ban ? <FaBan /> : <FaRegCheckCircle />}
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
