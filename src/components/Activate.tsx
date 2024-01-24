import { useNavigate, useParams } from 'react-router-dom'

import { activateUser } from '../Servies/user'
import showToast from '../helper/toast'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import userState from '../models/userState'
import AppDispatch from '../models/AppDispatch'

const Activate = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const {error ,status} = useSelector(userState)
  const handleActivate = (token: string | undefined) => {
    if(token){
      dispatch(activateUser(token))
      navigate('/login')

  }}
  useEffect(()=>{
    error && showToast(error,false,dispatch)
    status && showToast(status,true,dispatch)
  },[error, status, dispatch])

  return (
    <div className="flex items-center justify-center h-full flex-wrap">
      <div className="card xs:w-2/3 md:w-1/3 lg:w-1/4 space-y-7">
        <div className="">
        <h1 className='font-bold mb-2 xs:text-lg md:text-xl lg:text-2xl'>Welcome to ELECO!</h1>
        <p>Thank you for joining us. To get started, please activate your account by clicking the button below:</p>
        </div>
      <button className='btn2' onClick={() => handleActivate(token)}>Activate Account</button>
    </div>
    </div>
  )
}

export default Activate
