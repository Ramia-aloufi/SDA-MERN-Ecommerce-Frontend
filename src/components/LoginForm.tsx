import { useForm } from 'react-hook-form'
import { object, string, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { useEffect } from 'react'
import { fetchUser, logIn, userState } from '../redux/slices/user/UserSlice'
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
  const { items, userData } = useSelector(userState)

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  const onSubmit = (data: LoginSchema) => {
    const userExist = items.find((user) => user.email == data.email)
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register('email')}
              id="email"
              type="text"
              className="p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-200"
            />
            {errors.email && <p className="text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              {...register('password')}
              id="password"
              type="password"
              className="p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-200"
            />

            {errors.password && <p className="text-red-600">{errors.password.message}</p>}
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200">
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
