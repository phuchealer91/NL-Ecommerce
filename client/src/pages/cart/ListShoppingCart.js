import { InputNumber } from 'antd'
import React, { useState } from 'react'
import ModalImage from 'react-modal-image'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import imageDefault from '../../assets/images/default-image.jpg'
import { ModalConfirm } from '../../components/ModalConfirm'
import { formatPrice } from '../../helpers/formatPrice'
import { addToCart } from '../../redux/actions/cart'
const ListShoppingCart = ({ item }) => {
  const [showModal, setShowModal] = useState(false)
  const [idDelete, setIdDelete] = useState('')
  const dispatch = useDispatch()

  function onChangeCount(count) {
    let countX = count < 1 ? 1 : count

    if (count && item.quantity > 0) {
      if (count > item.quantity) {
        return toast.warning(`Sản phẩm chỉ còn: ${item.quantity} `)
      }
    } else {
      return toast.error(`Sản phẩm đã hết hàng. Vui lòng chọn sản phẩm khác`)
    }
    let cart = []
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      cart.map((pro, i) => {
        if (pro._id === item._id) {
          return (cart[i].count = countX)
        }
      })
      localStorage.setItem('cart', JSON.stringify(cart))
      dispatch(addToCart(cart))
    }
  }

  function onHandleDeleteItem() {
    setShowModal(false)
    let cart = []
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      cart.map((pro, i) => {
        if (pro._id === idDelete) {
          return cart.splice(i, 1)
        }
      })
      localStorage.setItem('cart', JSON.stringify(cart))

      dispatch(addToCart(cart))
    }
  }
  // function onFocus() {}
  // function onBlur() {}
  // function onSearch() {}
  function onHandleDelete(id) {
    setShowModal(true)
    setIdDelete(id)
  }

  function closeModal() {
    setShowModal(false)
  }
  return (
    <>
      <ModalConfirm
        showModal={showModal}
        closeModal={closeModal}
        onHandleDeleteItem={onHandleDeleteItem}
        title="sản phẩm từ giỏ hàng"
        // categoryToDelete={categoryToDelete}
      />

      <div className="hidden md:block">
        <div className="py-3 flex-row justify-between items-center mb-0 hidden md:flex">
          <div className="w-1/2 lg:w-3/5 xl:w-3/5 flex flex-row items-start border-b-0 border-grey-dark pt-0 pb-0 pl-3 text-left">
            <div className="w-20 mx-0 relative pr-0 mr-3 ">
              <div className="h-20 rounded flex items-center justify-center">
                <div className="aspect-w-1 aspect-h-1 w-full">
                  <ModalImage
                    small={item ? item.images[0]?.url : imageDefault}
                    large={item ? item.images[0]?.url : imageDefault}
                    alt={`${item ? item.images[0]?.url : imageDefault}`}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start">
              <Link
                to={`/product/${item.slug}`}
                className="font-hk text-secondary text-base"
              >
                {item.title}
              </Link>
              <span className="pt-1 text-gray-700 font-semibold ">
                {formatPrice(item.price)}đ
              </span>
              <span
                className="pt-1 text-blue-600 cursor-pointer hover:underline"
                onClick={() => onHandleDelete(item?._id)}
              >
                Xóa
              </span>
            </div>
          </div>

          <div className="w-1/4 lg:w-1/5 xl:w-1/4 text-right pr-10 xl:pr-10 pb-4 flex flex-col items-center justify-end">
            <div className="custom-number-input h-10 w-32">
              <InputNumber
                size="middle"
                min={1}
                max={item.quantity}
                value={item.count}
                onChange={onChangeCount}
                className="opacity-100"
              />
            </div>
            <div className=" text-blue-700 text-base font-semibold">
              <span className="text-xs text-gray-500">Thành tiền:</span>{' '}
              {formatPrice(item.price * item.count)}đ
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

ListShoppingCart.propTypes = {}

export default ListShoppingCart
