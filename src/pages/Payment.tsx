import { Stripe, loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { baseURL } from '../api'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
import { useDispatch, useSelector } from 'react-redux'
import showToast from '../helper/toast'
import productState from '../models/ProductState'
import AppDispatch from '../models/AppDispatch'

const Payment = () => {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null)
  const [clientSecret, setClientSecret] = useState('')
  const { totalPrice } = useSelector(productState)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    axios
      .get(`${baseURL}/config`)
      .then(({ data }) => {
        setStripePromise(loadStripe(data.PublishableKey))
      })
      .catch((err) => {
        showToast(err, false, dispatch)
      })
  }, [])
  useEffect(() => {
    axios
      .post(`${baseURL}/payment-intent`, { amount: totalPrice })
      .then(({ data }) => {
        setClientSecret(data.clientSecret)
      })
      .catch((err) => {
        showToast(err, false, dispatch)
      })
  }, [])
  return (
    <div className="">
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}

export default Payment
