import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { object, string, z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IoCreateOutline } from 'react-icons/io5'

import UserSidbar from '../components/user/UserSidbar'
import { UpdateUser, userState } from '../redux/slices/user/UserSlice'

const UserPage = () => {
  const userSchema = object({
    firstName: string().min(3),
    lastName: string().min(3)
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
  const dispatch = useDispatch()

  const onEdit = () => {
    console.log('onEdit')
    setIsEdit(true)
    setValue('firstName', userData?.firstName || '')
    setValue('lastName', userData?.lastName || '')
  }
  const onSubmit = (data: UserSchema) => {
    dispatch(UpdateUser({ ...userData, firstName: data.firstName, lastName: data.lastName }))
    setIsEdit(false)
  }

  return (
    <div className=" h-full grid grid-cols-[1fr,3fr]">
      <UserSidbar />
      <div className="flex justify-center items-center">
        {!isEdit && (
          <div className="bg-white space-y-4 p-8 px-16 rounded-lg shadow-md grid">
            <h1 className="mb-4 font-semibold">User Informations</h1>
            <span>First Name: {userData?.firstName}</span>
            <span>Last Name :{userData?.lastName}</span>
            <button
              onClick={() => {
                onEdit()
              }}
              className="btn flex justify-center gap-2">
              Edit
              <IoCreateOutline className="text-lg" />
            </button>
          </div>
        )}
        {isEdit && (
          <div className="bg-white p-8  rounded-lg shadow-md grid">
            <h1 className="mb-4 font-semibold">Update Informations</h1>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <input type="text" {...register('firstName')} />
              {errors.firstName && <p className="errorMessage">{errors.firstName.message}</p>}
              <input type="text" {...register('lastName')} />
              {errors.lastName && <p className="errorMessage">{errors.lastName.message}</p>}
              <input type="submit" className="btn" />
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserPage
