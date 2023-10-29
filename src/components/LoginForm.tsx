import { useForm } from 'react-hook-form'
import { object, string, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../redux/store'
import { logIn, userState } from '../redux/slices/user/UserSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const loginSchema = object({
  email: string().email(),
  password: string().min(6)
})

type LoginSchema = z.infer<typeof loginSchema>

function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema) // Use Zod schema resolver
  })

  const dispatch = useDispatch<AppDispatch>()
  const { users, userData } = useSelector(userState)
  const onSubmit = (data: LoginSchema) => {
    const userExist = users.find((user) => user.email == data.email)
    if (userExist) {
      dispatch(logIn(userExist))
      toast.success('Login successful!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000 // Auto close the toast after 3 seconds
      })
    } else {
      toast.error('Login failed. Please check your credentials!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000 // Auto close the toast after 3 seconds
      })
    }
    console.log('Form values:', data)
    console.log('Form values:', userData)
    reset()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <ToastContainer />
      <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Log in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email">Email</label>
            <input {...register('email')} id="email" type="text" />
            {errors.email && <p className="errorMessage">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input {...register('password')} id="password" type="password" />

            {errors.password && <p className="errorMessage">{errors.password.message}</p>}
          </div>
          <div>
            <button type="submit" className="submit">
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
