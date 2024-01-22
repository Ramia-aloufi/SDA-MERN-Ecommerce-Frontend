import { useNavigate, useParams } from 'react-router-dom'

import { activateUser } from '../Servies/user'

const Activate = () => {
  const { token } = useParams()

  console.log('token', token)

  const navigate = useNavigate()
  const handleActivate = (token: string | undefined) => {
    token && activateUser(token)
    navigate('/')
  }

  return (
    <div className="flex items-center justify-center h-full flex-wrap">
      <button onClick={() => handleActivate(token)}>Activate Account</button>
    </div>
  )
}

export default Activate
