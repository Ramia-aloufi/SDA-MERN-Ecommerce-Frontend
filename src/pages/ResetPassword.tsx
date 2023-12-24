import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { object, string, z } from 'zod'
import { postCategory } from '../Servies/category'
import { AppDispatch } from '../redux/store'
import { forgotPassword, resetPassword } from '../Servies/user'
import { useEffect, useState } from 'react'
import { userState } from '../redux/slices/user/userSlice'

const resetpasswordForm = z
  .object({
    password: z.string().min(6),
    confirmPassword: z.string().min(6)
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

type CategorySchema = z.infer<typeof resetpasswordForm>
const ResetPassword = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CategorySchema>({
    resolver: zodResolver(resetpasswordForm)
  })

  const onSubmit = async (data: CategorySchema) => {
    if (token) {
      dispatch(resetPassword({ password: data.password, token: token }))
      reset()
      navigate('/login')
    }
  }
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-md w-full  p-6 bg-white rounded-lg shadow-lg px-8 ">
        <h2>reset Password</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <label htmlFor="email">password:</label>
            <input type="password" id="password" {...register('password')} />
            {errors.password && <p className="text-red-600 text-xs">{errors.password.message}</p>}
          </div>
          <div className="">
            <label htmlFor="email">confirmPassword:</label>
            <input type="password" id="confirmPassword" {...register('confirmPassword')} />
            {errors.confirmPassword && (
              <p className="text-red-600 text-xs">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button type="submit" className="btn">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
