import { Stripe, loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { baseURL } from '../api'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
import { useSelector } from 'react-redux'
import { productState } from '../redux/slices/products/productSlice'

const Payment = () => {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null)
  const [clientSecret, setClientSecret] = useState('')
  const { totalPrice } = useSelector(productState)

  useEffect(() => {
    axios
      .get(`${baseURL}/config`)
      .then(({ data }) => {
        setStripePromise(loadStripe(data.PublishableKey))
        console.log(data.PublishableKey)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  useEffect(() => {
    axios
      .post(`${baseURL}/payment-intent`, { amount: totalPrice })
      .then(({ data }) => {
        setClientSecret(data.clientSecret)
        console.log(data.clientSecret)
        console.log(data.payment)
      })
      .catch((err) => {
        console.log(err)
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
