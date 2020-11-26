import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button, Divider, List, Typography, Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
  addAddressCart,
  addToCart,
  emptyCart,
  getUserCart,
} from '../../redux/actions/cart'
import { formatPrice } from '../../helpers/formatPrice'
import ReactQuill from 'react-quill' // ES6
import 'react-quill/dist/quill.snow.css' // ES6
const { Text } = Typography
function CheckOut(props) {
  const dispatch = useDispatch()
  const [addressCart, setAddressCart] = useState(null)
  const { cartTotals, cartCheckOut, isLoading, isAddAddress } = useSelector(
    (state) => state.cart
  )
  console.log(cartTotals, cartCheckOut)
  useEffect(() => {
    dispatch(getUserCart())
  }, [])

  function onHandleEmptyCart() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart')
    }
    dispatch(addToCart([]))
    dispatch(emptyCart([]))
  }
  function onHandleChange(value) {
    setAddressCart(value)
  }
  function onSubmit() {
    dispatch(addAddressCart({ address: addressCart }))
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
          <h3 className="text-2xl font-medium">Khuyến mãi</h3>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
            ea.
          </span>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} className="px-2">
          <List
            header={
              <h3 className="text-2xl font-medium">Danh sách đơn hàng</h3>
            }
            footer={
              <h3 className="text-lg font-medium">
                Tổng tiền: {formatPrice(cartTotals)} VND
              </h3>
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
            <Button type="primary" size="large" disabled={isAddAddress}>
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
