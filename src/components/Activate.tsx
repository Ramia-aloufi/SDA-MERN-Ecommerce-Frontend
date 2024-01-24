import { useNavigate, useParams } from 'react-router-dom'

import { activateUser } from '../Servies/user'
import showToast from '../helper/toast'
import { useDispatch } from 'react-redux'

const Activate = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleActivate = (token: string | undefined) => {
    if(token){
      activateUser(token)
      navigate('/')
    }else{
      showToast('error activated account',false, dispatch)
    }
  }

  return (
    <div className="flex items-center justify-center h-full flex-wrap">
      <div className="card w-2/3 space-y-4">
        <div className="">
        <h1 className='font-semibold'>Welcome to ELECO!</h1>
        <p>Thank you for joining us. To get started, please activate your account by clicking the button below:</p>
        </div>
      <button className='btn2' onClick={() => handleActivate(token)}>Activate Account</button>
    </div>
    </div>
  )
}

export default Activate
