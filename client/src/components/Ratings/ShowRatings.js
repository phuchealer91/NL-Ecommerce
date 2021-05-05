import { Rate } from 'antd'
import React from 'react'

function ShowRatings(product) {
  let len = product?.reviews.length
  let result =
    product?.reviews.reduce((acc, item) => item.rating + acc, 0) / len
  return (
    <div className="">
      <Rate disabled value={result} style={{ fontSize: '20px' }} />
      <span className="text-blue-700 pl-2">({len} đánh giá)</span>
    </div>
  )
}
ShowRatings.propTypes = {}
export default ShowRatings
