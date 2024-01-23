import { useForm } from 'react-hook-form'
import { object, string, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import 'react-toastify/dist/ReactToastify.css'
import { postUser } from '../Servies/user'
import { useDispatch } from 'react-redux'
import AppDispatch from '../models/AppDispatch'

const signupSchema = object({
  username: string().min(3),
  email: string().email(),
  password: string().min(6)
})

type SignupSchema = z.infer<typeof signupSchema>

const SignupForm = () => {
  const dispatch = useDispatch<AppDispatch>()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema) // Use Zod schema resolver
  })

  const onSubmit = (data: SignupSchema) => {
    dispatch(postUser(data))
    reset()
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="userName">UserName</label>
        <input {...register('username')} id="username" type="text" />
        {errors.username && <p className="errorMessage">{errors.username.message}</p>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input {...register('email')} id="email" type="email" />
        {errors.email && <p className="errorMessage">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input {...register('password')} id="password" type="password" />

        {errors.password && <p className="errorMessage">{errors.password.message}</p>}
      </div>
      <div>
        <button type="submit" className="btn2">
          Create account
        </button>
      </div>
    </form>
  )
}

export default SignupForm
