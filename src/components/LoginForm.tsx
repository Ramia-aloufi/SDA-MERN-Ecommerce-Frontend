import { useForm } from 'react-hook-form'
import { object, string, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { login } from '../Servies/user'
import AppDispatch from '../models/AppDispatch'
import userState from '../models/userState'

const loginSchema = object({
  email: string().email(),
  password: string().min(6)
})

type LoginSchema = z.infer<typeof loginSchema>

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { userData } = useSelector(userState)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema) // Use Zod schema resolver
  })

  const onSubmit = async (data: LoginSchema) => {
    dispatch(login(data))
    reset()
  }
  useEffect(() => {
    if (userData) {
      navigate(`${userData?.isAdmin ? '/admin' : '/user'}`)
    }
  }, [userData])

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
        <Link to="/forgot-password">Forgot Password ?</Link>
        <button type="submit" className="btn2">
          Log in
        </button>
      </div>
    </form>
  )
}

export default LoginForm
