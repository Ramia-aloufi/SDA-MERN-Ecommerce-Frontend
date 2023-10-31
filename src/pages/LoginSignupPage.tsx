import { useState } from 'react'
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'
import { ToastContainer } from 'react-toastify'

const LoginSignupPage = () => {
  const [loginForm, setLoginForm] = useState<boolean>(true)

  const handleChangeForm = () => {
    setLoginForm((prev) => !prev)
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <ToastContainer />
      <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-lg shadow-lg px-8 ">
        <div className="flex gap-4">
          <button
            onClick={handleChangeForm}
            className={`${loginForm ? 'text-orange-500' : 'text-gray-500'}`}>
            sign in
          </button>
          <button
            onClick={handleChangeForm}
            className={`${!loginForm ? 'text-orange-500' : 'text-gray-500'} `}>
            signup
          </button>
        </div>
        <div>{loginForm ? <LoginForm /> : <SignupForm />}</div>
      </div>
    </div>
  )
}

export default LoginSignupPage
