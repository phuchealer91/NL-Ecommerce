import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Drawer, Row } from 'antd'
import './SidebarDrawer.scss'
import { hideDrawer } from '../../redux/actions/ui'
import { Link } from 'react-router-dom'
function SideDrawer(props) {
  const { ui, cart } = useSelector((state) => ({ ...state }))
  const dispatch = useDispatch()
  function onClose() {
    dispatch(hideDrawer())
  }
  function onHandleCheckOut() {
    dispatch(hideDrawer())
  }
  return (
    <Drawer
      title={`Giỏ Hàng Của Bạn (${cart.length})`}
      placement="right"
      closable={false}
      onClose={onClose}
      visible={ui.visible}
      width="380px"
    >
      <ul className="dra__list">
        {cart &&
          cart.map((c) => (
            <li className="dra__list-item" key={c._id}>
              <div className="dra__wrap">
                <img
                  src={c.images[0].url}
                  alt={c.title}
                  className="dra__wrap-avatar"
                />
                <div className="dra__content">
                  <h3 className="dra__content-name">
                    {c.title.substring(0, 20)}...
                  </h3>
                  <span className="dra__content-desc">
                    {c.description.substring(0, 40)}...
                  </span>
                </div>
              </div>
              <div className="dra__price">
                <span className="dra__price-red">{c.price}</span> VND
              </div>
            </li>
          ))}
        <div className="dra__btn">
          <Link to="/cart">
            <Button
              type="primary"
              size="large"
              className="dra__btn-check"
              onClick={onHandleCheckOut}
            >
              Thanh Toán
            </Button>
          </Link>
        </div>
      </ul>
    </Drawer>
  )
}
SideDrawer.propTypes = {}
export default SideDrawer
