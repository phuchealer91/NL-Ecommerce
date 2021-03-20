import { Button, Col, Divider, Input, List, Row, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill' // ES6
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { emptyCarts, getUserCarts } from '../../apis/cart'
import { formatPrice } from '../../helpers/formatPrice'
import imageDefault from '../../assets/images/default-image.jpg'
import ModalImage from 'react-modal-image'
import {
  addAddressCart,
  addToCart,
  applyCouponCart,
  emptyCart,
  getUserCart,
} from '../../redux/actions/cart'
import { getProvinceDistrict, getProvinces } from '../../apis/province'
const { Text } = Typography
function CheckOut(props) {
  const dispatch = useDispatch()
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [address, setAddress] = useState('')
  const [addressSaved, setAddressSaved] = useState(false)
  const [coupon, setCoupon] = useState('')
  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
  const [discountError, setDiscountError] = useState('')

  // const [addressCart, setAddressCart] = useState(null)
  // const [coupons, setCoupons] = useState('')
  const history = useHistory()
  // const [errorss, setErrorss] = useState(errorApplyCode || '')
  console.log('product', products)
  useEffect(() => {
    getUserCarts().then((res) => {
      setProducts(res.data.products)
      setTotal(res.data.cartTotal)
    })
  }, [])
  const onHandleEmptyCart = () => {
    // remove from local storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart')
    }
    // remove from redux
    dispatch(addToCart([]))
    // remove from backend
    emptyCarts().then((res) => {
      setProducts([])
      setTotal(0)
      setTotalAfterDiscount(0)
      setCoupon('')
      toast.success('Cart is emapty. Contniue shopping.')
    })
  }

  // function onHandleEmptyCart() {
  //   if (typeof window !== 'undefined') {
  //     localStorage.removeItem('cart')
  //   }
  //   dispatch(addToCart([]))
  //   dispatch(emptyCart([]))
  //   setCoupons('')
  // }
  // function onHandleChange(value) {
  //   setAddressCart(value)
  // }
  // function onSubmit() {
  //   dispatch(addAddressCart({ address: addressCart }))
  // }
  // function onHandleSubmit() {
  //   dispatch(applyCouponCart({ coupon: coupons }))

  // }

  const [province, setProvince] = useState('')
  const [provinceDistrict, setProvinceDistrict] = useState('')
  const [values, setValues] = useState([])
  const [valuess, setValuess] = useState([])
  useEffect(() => {
    getProvincess()
  }, [])
  useEffect(() => {
    getProvinceDistrictss()
  }, [valuess, province, provinceDistrict])
  function getProvincess() {
    getProvinces({})
      .then((res) => {
        setValues(res)
      })
      .catch((err) => console.log('Error anh em', err))
  }
  function getProvinceDistrictss() {
    getProvinceDistrict(province)
      .then((res) => {
        setValuess(res)
      })
      .catch((err) => console.log('Error anh em', err))
  }
  function handleChangeProvinceDistrict(value) {
    setProvinceDistrict(value)
  }
  // function handleChange(value) {
  //   setProvinceDistrict('')
  //   setProvince(value)
  // }
  return (
    <React.Fragment>
      {/* <Row>
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
      </Row> */}
      <div className="xl:max-w-7xl mx-auto bg-white rounded">
        <div className="px-3 pt-3 pb-8">
          <div className="uppercase border-b border-gray-100 pb-1 text-gray-700 font-semibold  border-solid px-4">
            ĐỊA CHỈ GIAO HÀNG
          </div>
          <div>
            <div className="my-5 px-4">
              <div className="my-2 flex items-center justify-between">
                <span> Họ và tên người nhận </span>
                <input
                  type="text"
                  placeholder="Nhập họ và tên người nhận"
                  className="ml-2 py-2 w-align border px-3 text-grey-darkest rounded"
                />
              </div>
              <div className="my-2 flex items-center justify-between">
                <span> Số điện thoại </span>
                <input
                  type="text"
                  placeholder="Nhập số điện thoại"
                  className="ml-2 py-2 w-align border px-3 text-grey-darkest rounded"
                />
              </div>
              <div className="my-2 flex items-center justify-between">
                <span> Tỉnh/Thành Phố </span>
                <select
                  type="select"
                  placeholder="Chọn tỉnh/thành phố"
                  className="ml-2 py-2 w-align border px-3 text-grey-darkest rounded"
                  // value={provinceDistrict}
                  // onChange={handleChangeProvinceDistrict}
                >
                  {values &&
                    values.data?.provinces.map((arr) => {
                      return (
                        <option key={arr._id} value={arr.code}>
                          {arr.name}
                        </option>
                      )
                    })}
                </select>
              </div>
              <div className="my-2 flex items-center justify-between">
                <span> Quận/Huyện</span>
                <select
                  type="select"
                  placeholder="Chọn tỉnh/thành phố"
                  className="ml-2 py-2 w-align border px-3 text-grey-darkest rounded"
                  value={provinceDistrict}
                  onChange={handleChangeProvinceDistrict}
                >
                  {valuess &&
                    valuess.data?.districts.map((arr) => {
                      return (
                        <option key={arr._id} value={arr.code}>
                          {arr.name}
                        </option>
                      )
                    })}
                </select>
              </div>
              <div className="my-2 flex items-center justify-between">
                <span> Phường/Xã</span>
                <input
                  type="text"
                  placeholder="Nhập số điện thoại"
                  className="ml-2 py-2 w-align border px-3 text-grey-darkest rounded"
                />
              </div>
              <div className="my-2 flex items-center justify-between">
                <span> Địa chỉ nhận hàng</span>
                <input
                  type="text"
                  placeholder="Nhập số điện thoại"
                  className="ml-2 py-2 w-align border px-3 text-grey-darkest rounded calc"
                />
              </div>
            </div>

            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="xl:max-w-7xl mx-auto bg-white rounded mt-4">
        <div className="px-3 pt-3 pb-8">
          <div className="uppercase border-b border-gray-100 pb-1 text-gray-700 font-semibold  border-solid px-4">
            KIỂM TRA LẠI ĐƠN HÀNG
          </div>
          {products &&
            products.map((item, i) => {
              return (
                <div className="hidden md:block">
                  <div className="py-3 flex-row justify-between items-center mb-0 hidden md:flex">
                    <div className="w-1/2 lg:w-align xl:w-align flex flex-row items-start border-b-0 border-grey-dark pt-0 pb-0 pl-3 text-left">
                      <div className="w-20 mx-0 relative pr-0 mr-3 ">
                        <div className="h-20 rounded flex items-center justify-center">
                          <div className="aspect-w-1 aspect-h-1 w-full">
                            <ModalImage
                              small={
                                item
                                  ? item.product.images[0]?.url
                                  : imageDefault
                              }
                              large={
                                item
                                  ? item.product.images[0]?.url
                                  : imageDefault
                              }
                              alt={`${
                                item
                                  ? item.product.images[0]?.url
                                  : imageDefault
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-start items-start">
                        <Link
                          to={`/product/${item.product.slug}`}
                          className="font-hk text-secondary text-base"
                        >
                          {item.product.title}
                        </Link>
                        <span className="pt-1 text-gray-700 font-semibold ">
                          {formatPrice(item.product.price)}đ
                        </span>
                      </div>
                    </div>

                    <div className="w-1/4 lg:w-1/5 xl:w-1/4 pr-10 xl:pr-10 pb-4 flex flex-col items-center justify-end">
                      <div className="custom-number-input h-10 w-32">
                        <div className="text-blue-700 text-base font-semibold">
                          <span className="text-xs text-gray-500">
                            Số lượng:
                          </span>{' '}
                          {item.count}
                        </div>
                      </div>
                      <div className=" text-blue-700 text-base font-semibold">
                        <span className="text-xs text-gray-500">
                          Thành tiền:
                        </span>{' '}
                        {formatPrice(item.product.price * item.count)}đ
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </React.Fragment>
  )
}
CheckOut.propTypes = {}

export default CheckOut
