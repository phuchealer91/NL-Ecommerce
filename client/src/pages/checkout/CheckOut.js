import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button, Divider, List, Typography, Spin, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
  addAddressCart,
  addToCart,
  applyCouponCart,
  emptyCart,
  getUserCart,
} from '../../redux/actions/cart'
import { formatPrice } from '../../helpers/formatPrice'
import ReactQuill from 'react-quill' // ES6
import 'react-quill/dist/quill.snow.css' // ES6
import { useHistory } from 'react-router-dom'
const { Text } = Typography
function CheckOut(props) {
  const dispatch = useDispatch()
  const {
    cartTotals,
    cartCheckOut,
    isLoading,
    isAddAddress,
    errors: errorApplyCode,
    totalAfterDiscount,
    isCheckError,
  } = useSelector((state) => state.cart)
  const [addressCart, setAddressCart] = useState(null)
  const [coupons, setCoupons] = useState('')
  const history = useHistory()
  // const [errorss, setErrorss] = useState(errorApplyCode || '')

  useEffect(() => {
    dispatch(getUserCart())
    // if (isCheckError) {
    //   setErrorss(errorApplyCode)
    // }
  }, [])
  // useEffect(() => {
  //   if (isCheckError) {
  //     setErrorss(errorApplyCode)
  //   } else {
  //     dispatch(applyCouponCart(''))
  //   }
  // }, [isCheckError])

  function onHandleEmptyCart() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart')
    }
    dispatch(addToCart([]))
    dispatch(emptyCart([]))
    setCoupons('')
  }
  function onHandleChange(value) {
    setAddressCart(value)
  }
  function onSubmit() {
    dispatch(addAddressCart({ address: addressCart }))
  }
  function onHandleSubmit() {
    dispatch(applyCouponCart({ coupon: coupons }))
    // if (isCheckError === '') {
    //   dispatch(applyCouponCart(''))
    // }
  }
  return (
    <React.Fragment>
      <Row>
        <Col xs={24} sm={24} md={12} lg={12} className="px-2">
          <h3 className="text-2xl font-medium mb-3">Thông tin vận chuyển</h3>
          <ReactQuill
            value={addressCart}
            onChange={onHandleChange}
            placeholder="Điền thông tin địa chỉ của bạn"
          />
          <Button
            type="primary"
            size="middle"
            className="my-4"
            onClick={onSubmit}
          >
            Save
          </Button>
          <Divider />
          <h3 className="text-2xl font-medium mb-4">Áp dụng mã giảm giá</h3>
          <form action="">
            <label htmlFor="" className="text-xl">
              Code
            </label>
            <br />
            <Input
              type="text"
              onChange={(e) => {
                setCoupons(e.target.value)
                // setErrorss('')
              }}
              value={coupons}
              className="w-60 mt-3"
              placeholder="Apply code coupon"
            />
            <Button
              type="primary"
              size="middle"
              className="my-4 ml-3"
              onClick={onHandleSubmit}
            >
              Apply
            </Button>
          </form>
          {/* {isCheckError === true ? (
            <div className="bg-red-500 px-2 py-2 text-lg text-white w-60">
              {errorss}
            </div>
          ) : (
            ''
          )} */}
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} className="px-2">
          <List
            header={
              <h3 className="text-2xl font-medium">Danh sách đơn hàng</h3>
            }
            footer={
              <>
                <h3 className="text-lg font-medium">
                  Tổng tiền: {formatPrice(cartTotals)} VND
                </h3>
                {totalAfterDiscount > 0 ? (
                  <h3 className="text-lg font-medium bg-green-600 py-2 pl-2 text-white my-2">
                    Tổng tiền sau khi giảm giá:{' '}
                    <span className="text-red-700 text-xl font-bold m-0 inline-block">
                      {formatPrice(totalAfterDiscount)} VND
                    </span>
                  </h3>
                ) : (
                  ''
                )}
              </>
            }
            bordered
            loading={isLoading}
            dataSource={cartCheckOut}
            renderItem={(cc) => (
              <List.Item>
                <Typography.Text className="text-lg">
                  {cc.product.title} ({cc.color}) x {cc.count} ={' '}
                  {formatPrice(cc.product.price * cc.count)}{' '}
                </Typography.Text>
              </List.Item>
            )}
          />

          <div className="my-4">
            <Button
              type="primary"
              size="large"
              disabled={isAddAddress || !cartCheckOut.length}
              onClick={() => history.push('/payment')}
            >
              Đặt hàng
            </Button>
            <Button
              danger
              size="large"
              className="ml-2"
              disabled={!cartCheckOut.length}
              onClick={onHandleEmptyCart}
            >
              Xóa đơn hàng
            </Button>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  )
}
CheckOut.propTypes = {}

export default CheckOut
