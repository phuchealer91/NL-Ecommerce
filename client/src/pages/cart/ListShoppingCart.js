import { InputNumber } from 'antd'
import React, { useState } from 'react'
import ModalImage from 'react-modal-image'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { userCarts } from '../../apis/cart'
import imageDefault from '../../assets/images/default-image.jpg'
import { EmptyCart } from '../../components/Empty'
import { ModalConfirm } from '../../components/ModalConfirm'
import { formatPrice, formatPriceSale } from '../../helpers/formatPrice'
import { addToCart } from '../../redux/actions/cart'
const ListShoppingCart = ({ cartLists }) => {
  const { user } = useSelector((state) => state)
  const [showModal, setShowModal] = useState(false)
  const [idDelete, setIdDelete] = useState('')
  const [isCheck, setIsCheck] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  // function onChangeCount(count) {
  //   let countX = count < 1 ? 1 : count

  //   if (count && item.quantity > 0) {
  //     if (count > item.quantity) {
  //       return toast.warning(`Sản phẩm chỉ còn: ${item.quantity} `)
  //     }
  //   } else {
  //     return toast.error(`Sản phẩm đã hết hàng. Vui lòng chọn sản phẩm khác`)
  //   }
  //   let cart = []
  //   if (typeof window !== 'undefined') {
  //     if (localStorage.getItem('cart')) {
  //       cart = JSON.parse(localStorage.getItem('cart'))
  //     }
  //     cart.map((pro, i) => {
  //       if (pro._id === item._id) {
  //         return (cart[i].count = countX)
  //       }
  //     })
  //     localStorage.setItem('cart', JSON.stringify(cart))
  //     dispatch(addToCart(cart))
  //   }
  // }

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
  function getTotal() {
    return cartLists.reduce((curr, next) => {
      if (next.sale > 0) {
        return curr + next.count * ((next.price * (100 - next.sale)) / 100)
      } else {
        return curr + next.count * next.price
      }
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
      <ModalConfirm
        showModal={showModal}
        closeModal={closeModal}
        onHandleDeleteItem={onHandleDeleteItem}
        title="sản phẩm từ giỏ hàng"
        // categoryToDelete={categoryToDelete}
      />
      <div className="flex flex-col-reverse lg:flex-row justify-between pb-16 sm:pb-20 lg:pb-24">
        <div className="lg:w-2/3 pr-6">
          <div className="pt-8 bg-white  rounded">
            {!cartLists.length ? (
              <div className="flex items-center justify-center">
                <EmptyCart />
                <Link to="/shop">Tiếp tục mua hàng</Link>{' '}
              </div>
            ) : (
              cartLists &&
              cartLists.map((item) => (
                <div className="hidden md:block">
                  <div className="py-3 flex-row justify-between items-center mb-0 hidden md:flex">
                    <div className="w-1/2 lg:w-3/5 xl:w-3/5 flex flex-row items-start border-b-0 border-grey-dark pt-0 pb-0 pl-3 text-left">
                      <div className="w-20 mx-0 relative pr-0 mr-3 ">
                        <div className="h-20 rounded flex items-center justify-center">
                          <div className="aspect-w-1 aspect-h-1 w-full">
                            <ModalImage
                              small={item ? item.images[0]?.url : imageDefault}
                              large={item ? item.images[0]?.url : imageDefault}
                              alt={`${
                                item ? item.images[0]?.url : imageDefault
                              }`}
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
                        <div className="my-1  ">
                          {item.sale > 0 ? (
                            <div className="flex items-center">
                              <div className="mr-4 text-blue-600 text-base font-semibold">
                                {formatPriceSale(item.price, item.sale)}đ
                              </div>
                              <div className=" text-gray-400 text-sm line-through">
                                {formatPrice(item.price)}đ
                              </div>{' '}
                            </div>
                          ) : (
                            <div className="text-blue-600 text-base font-semibold">
                              {formatPrice(item.price)}đ
                            </div>
                          )}
                        </div>
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
                          // max={item.quantity + 1}
                          defaultValue={1}
                          onChange={(count) => {
                            let countX = count < 1 ? 1 : count
                            setIsCheck(false)
                            if (count && item.quantity > 0) {
                              if (count > item.quantity) {
                                setIsCheck(true)

                                setTimeout(() => {
                                  return toast.warning(
                                    `Sản phẩm chỉ còn: ${item.quantity} `
                                  )
                                }, 500)
                              }
                            } else {
                              setIsCheck(true)
                              return toast.error(
                                `Sản phẩm đã hết hàng. Vui lòng chọn sản phẩm khác`
                              )
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
                          }}
                          className="opacity-100"
                        />
                      </div>
                      <div className=" text-blue-700 text-base font-semibold">
                        <span className="text-xs text-gray-500">
                          Thành tiền:
                        </span>{' '}
                        {item.sale > 0
                          ? formatPriceSale(item.price * item.count, item.sale)
                          : formatPrice(item.price * item.count)}
                        đ
                      </div>
                    </div>
                  </div>
                </div>
              ))
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
                    disabled={!cartLists.length || isCheck}
                    className={`btn  ${
                      isCheck ? 'bg-gray-300' : 'btn-primary'
                    } btn-addToCart uppercase mx-auto w-4/5`}
                  >
                    Thanh Toán
                  </button>
                  {/* <button
                    onClick={onHandleCheckOut}
                    disabled={!cartLists.length}
                    className="btn btn-primary btn-addToCart uppercase mx-auto w-4/5 mt-2"
                  >
                    Thanh Toán Tiền Mặt
                  </button> */}
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
    </>
  )
}

ListShoppingCart.propTypes = {}

export default ListShoppingCart
