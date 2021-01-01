import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Divider, Row } from 'antd'
import './Cart.scss'
import { Link, useHistory } from 'react-router-dom'
import { formatPrice } from '../../helpers/formatPrice'
import ListShoppingCart from './ListShoppingCart'
import { userCart } from '../../redux/actions/cart'
function Cart(props) {
  const { cart, user } = useSelector((state) => ({ ...state }))
  let { cartLists, isCheckOut } = cart
  const history = useHistory()
  const dispatch = useDispatch()
  function getTotal() {
    return cartLists.reduce((curr, next) => {
      return curr + next.count * next.price
    }, 0)
  }
  function onHandleCheckOut() {
    dispatch(userCart({ cartLists }))
    history.push('/check-out')
  }

  return (
    <React.Fragment>
      <div className="shopping-cart">
        <Row>
          <Col xs={24} sm={24} md={16} lg={16}>
            <h3 className="shopping__heading">
              Giỏ hàng:{' '}
              <span className="shopping__heading-red">{cartLists.length}</span>{' '}
              sản phẩm
            </h3>
            {!cartLists.length ? (
              <div className="shopping__wrap">
                <p className="shopping__nothing">Không có sản phẩm nào. </p>{' '}
                <Link to="/shop">Tiếp tục mua hàng</Link>{' '}
              </div>
            ) : (
              <ListShoppingCart />
            )}
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <h3 className="shopping__heading">Thanh Toán</h3>
            <Divider style={{ margin: '10px 0' }} />
            <h5 className="shopping__detail">Chi tiết thanh toán</h5>
            {cartLists.map((c, i) => (
              <ul key={c._id} className="shopping__detail-wrap">
                <li className="shopping__detail-item">
                  <span className="shopping__detail-index">{i + 1}. </span>{' '}
                  {c.title} x {c.count} = {formatPrice(c.price * c.count)} VND
                </li>
              </ul>
            ))}
            <Divider style={{ margin: '10px 0' }} />
            <h5 className="shopping__total">
              Tổng: {formatPrice(getTotal())} VND
            </h5>
            <div className="shopping__checkout">
              {user && user.token ? (
                <>
                  <span className="shopping__btn">
                    <Button
                      onClick={onHandleCheckOut}
                      type="primary"
                      shape="round"
                      size="middle"
                      disabled={!cartLists.length}
                    >
                      Proceed to Checkout
                    </Button>
                  </span>{' '}
                  <span className="shopping__btn">
                    <Button
                      type="primary"
                      shape="round"
                      size="middle"
                      disabled={!cartLists.length}
                    >
                      Pay Cash on Delivery
                    </Button>
                  </span>
                </>
              ) : (
                <Button type="primary" shape="round" size="middle">
                  <Link
                    to={{
                      pathname: '/login',
                      state: { from: 'cart' },
                    }}
                  >
                    Login to Checkout
                  </Link>
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  )
}
Cart.propTypes = {}

export default Cart
