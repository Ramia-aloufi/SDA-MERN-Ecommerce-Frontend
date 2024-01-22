import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { object, string, z } from 'zod'
import { IoCreateOutline } from 'react-icons/io5'

import { AdminSidbar } from '../components/admin/AdminSidbar'
import { userState } from '../redux/slices/user/userSlice'
import { updateUser } from '../Servies/user'
import { AppDispatch } from '../redux/store'

export const AdminPage = () => {
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
    console.log('onEdit')
    setIsEdit(true)
    setValue('username', userData?.username || '')
  }

  const onSubmit = (data: UserSchema) => {
    if (userData?.slug) {
      const user = { username: data.username }
      dispatch(updateUser({ user, slug: userData?.slug }))
      setIsEdit(false)
    }
  }
  return (
    <div className="h-full grid grid-cols-[1fr,3fr]">
      <AdminSidbar />
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
            <h1 className="mb-4 font-semibold">Update user Informations</h1>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <input type="text" {...register('username')} />
              {errors.username && <p className="errorMessage">{errors.username.message}</p>}
              <input type="submit" value="update" className="btn2" />
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
