import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { userCart } from '../../redux/actions/cart'
import { InputNumber } from 'antd'
import './Cart.scss'
import { EmptyCart } from '../../components/Empty'
import ListShoppingCart from './ListShoppingCart'
import { formatPrice } from '../../helpers/formatPrice'
import { userCarts } from '../../apis/cart'
import { toast } from 'react-toastify'
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
    userCarts({ cartLists })
      .then((res) => {
        if (res.data.newCart) {
          history.push('/check-out')
        }
      })
      .catch((error) => {
        toast.error('Lỗi thanh toán')
      })
  }
  return (
    <>
      <div className="pt-10 px-6">
        <h1 className="font-hkbold text-secondary text-2xl pb-3 text-center sm:text-left">
          GIỎ HÀNG{' '}
          <span className="text-gray-500 text-xs">
            ({cartLists.length} sản phẩm)
          </span>
        </h1>
        <div className="flex flex-col-reverse lg:flex-row justify-between pb-16 sm:pb-20 lg:pb-24">
          <div className="lg:w-2/3 pr-6">
            <div className="pt-8 bg-white rounded">
              {!cartLists.length ? (
                <div className="shopping__wrap">
                  <EmptyCart />
                  <Link to="/shop">Tiếp tục mua hàng</Link>{' '}
                </div>
              ) : (
                cartLists &&
                cartLists.map((item) => {
                  return <ListShoppingCart item={item} />
                })
              )}
            </div>
          </div>
          <div className="lg:w-2/6">
            <div className="bg-white rounded">
              <div className="px-3 pt-3 pb-8">
                <div className="border-b border-gray-100 pb-1 text-gray-500  border-solid">
                  Thành tiền
                </div>
                <div className="flex items-center justify-between pt-2 pb-4">
                  <p className="text-gray-500 font-semibold text-">
                    Tổng số tiền (gồm VAT)
                  </p>
                  <p className="text-blue-600 font-semibold text-xl">
                    {formatPrice(getTotal())}đ
                  </p>
                </div>
                {user && user.token ? (
                  <>
                    <button
                      onClick={onHandleCheckOut}
                      disabled={!cartLists.length}
                      className="btn btn-primary btn-addToCart uppercase mx-auto w-4/5"
                    >
                      Thanh Toán
                    </button>
                    <button
                      onClick={onHandleCheckOut}
                      disabled={!cartLists.length}
                      className="btn btn-primary btn-addToCart uppercase mx-auto w-4/5 mt-2"
                    >
                      Thanh Toán Tiền Mặt
                    </button>
                  </>
                ) : (
                  <Link
                    to={{
                      pathname: '/login',
                      state: { from: 'cart' },
                    }}
                    className="btn btn-primary btn-addToCart uppercase mx-auto w-4/5"
                  >
                    Đăng nhập
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
Cart.propTypes = {}

export default Cart
