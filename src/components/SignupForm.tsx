import { useForm } from 'react-hook-form'
import { object, string, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../redux/store'
import { addUser, logIn, userState } from '../redux/slices/user/UserSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

const signupSchema = object({
  firstName: string().min(3),
  lastName: string().min(3),
  email: string().email(),
  password: string().min(6)
})

type SignupSchema = z.infer<typeof signupSchema>

const SignupForm = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema) // Use Zod schema resolver
  })
  const dispatch = useDispatch<AppDispatch>()
  const { users, userData } = useSelector(userState)
  const onSubmit = (data: SignupSchema) => {
    const userExist = users.find((user) => user.email == data.email)
    if (!userExist) {
      dispatch(addUser(data))
      toast.success('Signup successful!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000 // Auto close the toast after 3 seconds
      })
      navigate('/')
    } else {
      toast.error('Signup failed. Please check your credentials!', {
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
        <label htmlFor="firstName">FirstName</label>
        <input {...register('firstName')} id="firstName" type="text" />
        {errors.email && <p className="errorMessage">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="lastName">LastName</label>
        <input {...register('lastName')} id="lastName" type="text" />
        {errors.email && <p className="errorMessage">{errors.email.message}</p>}
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
        <button type="submit" className="btn">
          Create account
        </button>
      </div>
    </form>
  )
}

export default SignupForm