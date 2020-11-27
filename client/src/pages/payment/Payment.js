import React from 'react'
import PropTypes from 'prop-types'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { StripeCheckOut } from '../../components/StripeCheckOut'
import { Col, Row } from 'antd'
function Payment(props) {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)
  return (
    <div className="">
      <h3 className="text-2xl mb-2 text-center font-bold">
        Hoàn tất thanh toán
      </h3>

      <Elements stripe={stripePromise}>
        <div className="grid place-items-center h-auto">
          <StripeCheckOut />
        </div>
      </Elements>
    </div>
  )
}

Payment.propTypes = {}
export default Payment
