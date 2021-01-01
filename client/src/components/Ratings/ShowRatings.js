import React from 'react'
import PropTypes from 'prop-types'
import { Rate } from 'antd'

function ShowRatings(product) {
  let len = product?.reviews.length
  let result =
    product?.reviews.reduce((acc, item) => item.rating + acc, 0) / len
  return (
    <div className="py-3 text-center">
      <Rate disabled value={result} style={{ fontSize: '20px' }} />
      <span className="text-gray-700">({len} reviews)</span>
    </div>
  )
}
ShowRatings.propTypes = {}
export default ShowRatings
