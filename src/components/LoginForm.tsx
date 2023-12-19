import { useForm } from 'react-hook-form'
import { object, string, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'

import { login } from '../Servies/user'
import { showToast } from '../helper/toast'

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

  const onSubmit = async (data: LoginSchema) => {
    await login(data)

    // if (userExist.role == 'admin') {
    //   navigate('/admin')
    // } else {
    //   navigate('/user')
    // }

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
