import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { createPaymentIntent } from '../../redux/actions/stripe'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button, Spin } from 'antd'
import { Link } from 'react-router-dom'
import './StripeCheckOut.scss'
import { toast } from 'react-toastify'
import { CheckOutlined, DollarCircleOutlined } from '@ant-design/icons'
import { formatPrice } from '../../helpers/formatPrice'
import { createOrder } from '../../redux/actions/cart'
function StripeCheckOut(props) {
  const [disabled, setDisabled] = useState(true)
  const [error, setError] = useState(null)
  const [successed, setSuccessed] = useState(false)
  const [processing, setProcessing] = useState(false)
  const dispatch = useDispatch()
  const { clientSecret, cartTotal, totalAfterDiscount, payable } = useSelector(
    (state) => state.stripe
  )
  const { isCoupon } = useSelector((state) => state.cart)
  const stripe = useStripe()
  const elements = useElements()
  useEffect(() => {
    dispatch(createPaymentIntent({ isCoupon }))
  }, [])
  function onHandlChange(e) {
    // disable button
    setDisabled(e.empty)
    // show error
    setError(e.error ? e.error.message : '')
  }
  const onHandleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    })
    if (payload.error) {
      toast.error(payload.error.message)
      setProcessing(false)
    } else {
      dispatch(createOrder(payload))
      toast.success('Check Out Success !')
      setProcessing(false)
      setSuccessed(true)
    }
  }

  const cartStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  }
  return (
    <React.Fragment>
      {successed && (
        <div className="text-lg pb-3">
          Payment Successful.{' '}
          <Link
            to="/user/history"
            className="text-blue-600 underline font-semibold"
          >
            See it in your puchare history
          </Link>
        </div>
      )}
      <form id="payment-form" className="stripe-form" onSubmit={onHandleSubmit}>
        <div
          className="bg-red-600 pb-3 py-2 text-lg text-white font-semibold text-center
        "
        >
          {isCoupon ? 'Apply Coupon' : 'No Apply Coupon '}
        </div>
        <div className="grid grid-cols-2 gap-10 pb-3">
          <div className="w-auto h-32 rounded-xl shadow-lg">
            <p className="text-green-600 text-xl font-semibold leading-10 text-center pb-2">
              <DollarCircleOutlined />
            </p>
            <span className="text-sm font-semibold text-center block pb-1">
              Total
            </span>
            <span className="text-2xl font-semibold text-center block">
              {formatPrice(cartTotal)} VND
            </span>
          </div>
          <div className="w-auto h-32 rounded-xl shadow-lg">
            <p className="text-green-600 text-xl font-semibold leading-10 text-center pb-2">
              <CheckOutlined />
            </p>
            <span className="text-sm font-semibold text-center block pb-1">
              Total Payable
            </span>
            <span className="text-2xl font-semibold text-center block">
              {formatPrice(payable)} VND
            </span>
          </div>
        </div>
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={onHandlChange}
        />
        {error && <span className="text-red-600 text-lg py-3">{error}</span>}

        <button
          type="submit"
          disabled={disabled || successed}
          className="stripe-button my-2 "
        >
          {processing ? <Spin /> : 'Pay'}
        </button>
      </form>
    </React.Fragment>
  )
}
StripeCheckOut.propTypes = {}
export default StripeCheckOut
