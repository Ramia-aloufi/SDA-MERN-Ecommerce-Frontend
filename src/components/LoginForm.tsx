import { useForm } from 'react-hook-form'
import { object, string, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../redux/store'
import { logIn, userState } from '../redux/slices/user/UserSlice'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

const loginSchema = object({
  email: string().email(),
  password: string().min(6)
})

type LoginSchema = z.infer<typeof loginSchema>

function LoginForm() {
  const navigate = useNavigate()
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
      if (userExist.role == 'admin') {
        navigate('/admin')
      } else {
        navigate('/user')
      }
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
        <button type="submit" className="btn">
          Log in
        </button>
      </div>
    </form>
  )
}

export default LoginForm
