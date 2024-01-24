import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'

import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'
import showToast from '../helper/toast'
import { useDispatch, useSelector } from 'react-redux'
import userState from '../models/userState'
import AppDispatch from '../models/AppDispatch'

const LoginSignupPage = () => {
  const [loginForm, setLoginForm] = useState<boolean>(true)
  const { status, error } = useSelector(userState)
  const dispatch = useDispatch<AppDispatch>()

  const handleChangeForm = () => {
    setLoginForm((prev) => !prev)
  }

  useEffect(()=>{
    error && showToast(error,false,dispatch)
    status && showToast(status,true,dispatch)
  },[error, status, dispatch])

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-50">
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
