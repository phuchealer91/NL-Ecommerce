import React from 'react'
import { useSelector } from 'react-redux'
import './Cart.scss'
import ListShoppingCart from './ListShoppingCart'
function Cart(props) {
  const { cart } = useSelector((state) => ({ ...state }))
  let { cartLists } = cart

  return (
    <>
      <div className="pt-10 px-6">
        <h1 className="font-hkbold text-secondary text-2xl pb-3 text-center sm:text-left">
          GIỎ HÀNG{' '}
          <span className="text-gray-500 text-xs">
            ({cartLists.length} sản phẩm)
          </span>
        </h1>
        <ListShoppingCart cartLists={cartLists} />
      </div>
    </>
  )
}
Cart.propTypes = {}

export default Cart
