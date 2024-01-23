import { useSelector } from 'react-redux'
import { useState } from 'react'

import { productState } from '../redux/slices/products/productSlice'
import Payment from '../pages/Payment'
// import { AppDispatch } from '../redux/store'
import { userState } from '../redux/slices/user/userSlice'
import { useNavigate } from 'react-router-dom'

const TotalInCard = () => {
  // const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { totalPrice } = useSelector(productState)
  const { userData } = useSelector(userState)
  const [ispayment, setIsPayment] = useState(false)
  const onSubmit = () => {
    if (userData) {
      setIsPayment(true)
    } else {
      navigate('/login')
    }
  }
  return (
    <div className="p-4 space-y-4 bg-white">
      <h1 className="font-bold text-xl ">Total</h1>
      <hr />
      <div className="flex  justify-between items-center">
        <span className="text-sm font-semibold">Total</span>
        <span className="text-lg xs:text-md font-semibold">${totalPrice}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold">Delivery</span>
        <span className="text-lg xs:text-md font-semibold">Free</span>
      </div>
      <hr />
      <button className="btn2" onClick={() => onSubmit()}>
        Checkout
      </button>
      {ispayment && <Payment />}
    </div>
  )
}

export default TotalInCard
