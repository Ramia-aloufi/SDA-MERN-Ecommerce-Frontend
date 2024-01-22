import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { activateUser } from '../Servies/user'
import { showToast } from '../helper/toast'

const Activate = () => {
  const { token } = useParams()

  console.log('token', token)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleActivate = async (token: string | undefined) => {
    const response = token && (await activateUser(token))
    showToast(response, true, dispatch)
    console.log('aa')
    navigate('/')
  }

  return (
    <div className="flex items-center justify-center h-full flex-wrap">
      <button onClick={() => handleActivate(token)}>Activate Account</button>
    </div>
  )
}

export default Activate
