import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser, userState } from '../../../redux/slices/user/UserSlice'
import { AppDispatch } from '../../../redux/store'
import { FiTrash, FiEdit } from 'react-icons/fi'

const UserLists = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { items, isLoading, error } = useSelector(userState)

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  if (isLoading) {
    return <p>Loading Data</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  return (
    <table className="min-w-full table-auto text-xs">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2 uppercase">Id</th>
          <th className="border p-2 uppercase">firstName</th>
          <th className="border p-2 uppercase">lastName</th>
          <th className="border p-2 uppercase">email</th>
          <th className="border p-2 uppercase">role</th>
          <th className="border p-2 uppercase">password</th>
          <th className="border p-2 uppercase">action</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => {
          return (
            <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="border p-2">{item.id}</td>
              <td className="border p-2">{item.firstName}</td>
              <td className="border p-2">{item.lastName}</td>
              <td className="border p-2">{item.email}</td>
              <td className="border p-2">{item.role}</td>
              <td className="border p-2">{item.password}</td>
              <td className="border p-2 grid gap-3 justify-center">
                <button className="trashBtn">
                  <FiTrash />
                </button>
                <button className="editBtn">
                  <FiEdit />
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
