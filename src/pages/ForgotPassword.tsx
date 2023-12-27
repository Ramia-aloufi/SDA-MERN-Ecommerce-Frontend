import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { object, string, z } from 'zod'
import { postCategory } from '../Servies/category'
import { AppDispatch } from '../redux/store'
import { forgotPassword } from '../Servies/user'
import { useEffect, useState } from 'react'
import { userState } from '../redux/slices/user/userSlice'

const emailSchema = object({
  email: string().email()
})

type CategorySchema = z.infer<typeof emailSchema>
const ForgotPassword = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [isSend, setIsSend] = useState<boolean>(false)
  const { status } = useSelector(userState)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CategorySchema>({
    resolver: zodResolver(emailSchema)
  })

  const onSubmit = async (data: CategorySchema) => {
    console.log(data.email)
    dispatch(forgotPassword(data.email))
    reset()
    setIsSend(true)
  }
  if (isSend) {
    return <h3 className="grid place-items-center h-full text-lg">Email sent successfully! 🎉</h3>
  }
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-md w-full  p-6 bg-white rounded-lg shadow-lg px-8 ">
        <h2>Forgot Password</h2>
        <p>Enter your email address to reset your password.</p>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" {...register('email')} />
          {errors.email && <p className="text-red-600">{errors.email.message}</p>}
          <button type="submit" className="btn">
            Send Email
          </button>
          <Link to="/login">back to login</Link>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
