import { useSelector } from 'react-redux'
import { useState } from 'react'

import Payment from '../pages/Payment'
import { useNavigate } from 'react-router-dom'
import userState from '../models/userState'
import productState from '../models/ProductState'
import User from '../models/User'

const TotalInCard = () => {
  const navigate = useNavigate()
  const { totalPrice } = useSelector(productState)
  const userData: User | null = useSelector(userState).userData
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
