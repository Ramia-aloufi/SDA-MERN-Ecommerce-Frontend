import { FormEvent, useState } from 'react'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../redux/store'
import { placeOrder } from '../Servies/order'
import { productState } from '../redux/slices/products/productSlice'

const CheckoutForm = () => {
  const [isproccesed, setIsproccesed] = useState(false)
  const [message, setMessage] = useState('')
  const stripe = useStripe()
  const element = useElements()
  const { inCart } = useSelector(productState)

  const dispatch = useDispatch<AppDispatch>()
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!stripe || !element) {
      return
    }
    setIsproccesed(true)
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements: element,
      confirmParams: {
        return_url: `${window.location.origin}/completion`
      },
      redirect: 'if_required'
    })
    if (error) {
      setMessage(`${error}`)
    } else if (paymentIntent && paymentIntent.status == 'succeeded') {
      const cart = inCart.map((item) => {
        return { product: item.product._id, quantity: item.quantity }
      })
      const order = {
        products: cart,
        payment: {
          amount: paymentIntent.amount,
          paymentMethod: paymentIntent.payment_method_types[0]
        }
      }
      dispatch(placeOrder(order))
      setMessage(`Payment status:${paymentIntent.status} 🎉`)
    }
    setIsproccesed(false)
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement />
      <button className="btn" disabled={isproccesed} id="submit">
        <span id="button-text">{isproccesed ? 'Processing..' : 'PayNow'}</span>
      </button>
      <span>{message}</span>
    </form>
  )
}

export default CheckoutForm
