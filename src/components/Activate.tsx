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
      <button className='btn2' onClick={() => handleActivate(token)}>Activate Account</button>
    </div>
  )
}

export default Activate
