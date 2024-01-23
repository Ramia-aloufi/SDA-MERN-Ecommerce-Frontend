import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { object, string, z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IoCreateOutline } from 'react-icons/io5'

import UserSidbar from '../components/user/UserSidbar'
import { updateUser } from '../Servies/user'
import userState from '../models/userState'
import AppDispatch from '../models/AppDispatch'

const UserPage = () => {
  const userSchema = object({
    username: string().min(3)
  })

  type UserSchema = z.infer<typeof userSchema>
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema)
  })
  const [isEdit, setIsEdit] = useState(false)
  const { userData } = useSelector(userState)
  const dispatch = useDispatch<AppDispatch>()

  const onEdit = () => {
    setIsEdit(true)
    setValue('username', userData?.username || '')
  }
  const onSubmit = (data: UserSchema) => {
    const user = { ...userData, username: data.username }
    const slug = userData?.slug
    if (slug) {
      dispatch(updateUser({ user, slug }))
    }
    setIsEdit(false)
  }

  return (
    <div className=" h-full grid grid-cols-[1fr,3fr]">
      <UserSidbar />
      <div className="flex justify-center items-center">
        {!isEdit && (
          <div className="bg-white space-y-4 p-8 px-16 rounded-lg shadow-md grid">
            <h1 className="mb-4 font-semibold">User Informations</h1>
            <span>First Name: {userData?.username}</span>
            <button
              onClick={() => {
                onEdit()
              }}
              className="btn2 flex justify-center gap-2">
              Edit
              <IoCreateOutline className="text-lg" />
            </button>
          </div>
        )}
        {isEdit && (
          <div className="bg-white p-8  rounded-lg shadow-md grid">
            <h1 className="mb-4 font-semibold">Update Informations</h1>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <input type="text" {...register('username')} />
              {errors.username && <p className="errorMessage">{errors.username.message}</p>}
              <input type="submit" className="btn2" />
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserPage
