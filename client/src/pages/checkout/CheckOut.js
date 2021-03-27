import { DeleteOutlined } from '@ant-design/icons'
import Modal from 'antd/lib/modal/Modal'
import React, { useEffect, useState } from 'react'
import ModalImage from 'react-modal-image'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  applyAddressCarts,
  applyCouponCarts,
  emptyCarts,
  getAddresss,
  getUserCarts,
  removeAddress,
} from '../../apis/cart'
import imageDefault from '../../assets/images/default-image.jpg'
import { formatPrice } from '../../helpers/formatPrice'
import { addToCart } from '../../redux/actions/cart'
import { appliedCoupon } from '../../redux/actions/coupon'

function CheckOut(props) {
  const dispatch = useDispatch()
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  // const [isSubmitAddr, setIsSubmitAddr] = useState(false)
  const [addressSaved, setAddressSaved] = useState(null)
  const [listAddress, setListAddress] = useState([])
  const [addressId, setAddressId] = useState('')
  const [coupons, setCoupons] = useState('')
  const [visible, setVisible] = useState(false)
  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
  // const [discountError, setDiscountError] = useState('')

  const history = useHistory()
  console.log('product', products)
  useEffect(() => {
    getUserCarts().then((res) => {
      setProducts(res.data.products)
      setTotal(res.data.cartTotal)
    })
    loadUserAddress()
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
      setCoupons('')
      toast.success('Giỏ hàng rỗng. Chúc bạn tiếp tục mua sản phẩm vui vẻ.')
      history.push('/')
    })
  }

  function loadUserAddress() {
    getAddresss()
      .then((res) => {
        setListAddress(res.data.listUserAddress.address)
        setAddressSaved(res.data.listUserAddress.address[0])
        applyAddressCarts({
          deliveryAddress: res.data.listUserAddress.address[0],
        })
      })
      .catch((error) => {
        toast.error('Lỗi lấy địa chỉ', error)
      })
  }
  function onHandleDelete(addressId) {
    setAddressId(addressId)
    setVisible(true)
  }
  function onHandleDeleted() {
    removeAddress(addressId)
      .then((res) => {
        toast.success('Xóa địa chỉ thành công')
        setVisible(false)
        loadUserAddress()
      })
      .catch((error) => {
        setVisible(false)
        toast.error('Xóa địa chỉ thất bại')
      })
  }
  function onHandleAddressSelected(deliveryAddress) {
    setAddressSaved(deliveryAddress)

    applyAddressCarts({ deliveryAddress })
      .then((res) => {
        console.log('deliveryAddressdeliveryAddress', res)
        if (res.data) {
          toast.success('Chọn địa chỉ giao hàng thành công')
          // setIsSubmitAddr(true)
        }
      })
      .catch((error) => {
        // setIsSubmitAddr(false)
        toast.error('Chọn địa chỉ giao hàng thất bại')
      })
  }

  function onHandleApplyCoupon() {
    applyCouponCarts({ coupons })
      .then((res) => {
        console.log('res', res)
        if (res.data) {
          setTotalAfterDiscount(res.data.totalAfterDiscount.totalAfterDiscount)
          dispatch(appliedCoupon(true))
        }
        toast.success('Áp dụng mã khuyến mãi thành công')
      })
      .catch((error) => {
        toast.error('Áp dụng mã khuyến mãi thất bại', error)
        dispatch(appliedCoupon(false))
      })
  }
  function onHandlePayMent() {
    console.log('dcmmmmmmmm', !addressSaved)
    console.log('dcmmmmmmmm 2', !products.length)
    if (!addressSaved || !products.length) {
      return toast.error('Vui lòng cập nhật địa chỉ giao hàng')
    } else {
      history.push('/payment')
    }
  }
  return (
    <div>
      <Modal
        title="Xóa địa chỉ giao hàng"
        visible={visible}
        onOk={onHandleDeleted}
        onCancel={() => setVisible(false)}
        okText="Chấp nhận"
        cancelText="Hủy"
      >
        <p>
          Khi bạn xóa địa chỉ giao hàng hiện tại, bạn sẽ{' '}
          <span className="text-red-600">không thể</span> khôi phục nó.
        </p>
      </Modal>
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
            TẤT CẢ ĐỊA CHỈ ()
          </div>
          <div className="my-3 mx-3 flex items-center">
            <span>Bạn muốn giao hàng đến địa chỉ khác?</span>
            <Link
              // disabled={districtWard || !products.length}
              onClick={() => history.push('/address')}
              className="text-blue-600  bg-transparent px-2"
            >
              Thêm địa chỉ giao hàng mới
            </Link>
          </div>
          <div className="flex items-start justify-start mt-4">
            {listAddress.length > 0 ? (
              listAddress.map((addr, idx) => {
                return (
                  <>
                    <div
                      key={addr._id}
                      className={`w-2/6 bg-gray-50 mx-3 border ${
                        addressSaved && addr._id === addressSaved?._id
                          ? 'border-dashed border-red-700 border-4'
                          : 'border-solid border-gray-200'
                      }`}
                    >
                      <div className="px-3 py-3">
                        <div className="text-base text-gray-600 font-semibold flex items-center justify-between">
                          <span>{addr.name}</span>
                          {idx === 0 && addr._id === addressSaved?._id ? (
                            <span className="text-blue-600 text-xs">
                              Mặc định
                            </span>
                          ) : (
                            ''
                          )}
                        </div>
                        <div className="text-base text-gray-600">
                          <span className="text-sm text-gray-500">
                            Địa chỉ:{' '}
                          </span>
                          {addr.fullAddress} - {addr.mainAddress}
                        </div>
                        <div className="text-base text-gray-600">
                          <span className="text-sm text-gray-500">
                            Điện thoại:{' '}
                          </span>
                          {addr.phone}
                        </div>
                      </div>

                      <div className="flex items-center justify-start mb-4 pl-3">
                        <button
                          onClick={() => onHandleAddressSelected(addr)}
                          className=" px-8 py-2 mr-3 bg-blue-600 text-blue-50 max-w-max shadow-sm hover:shadow-lg rounded"
                        >
                          Giao đến địa chỉ này
                        </button>

                        <button
                          onClick={() => onHandleDelete(addr._id)}
                          className=" px-8 py-2 bg-red-500 text-blue-50 max-w-max shadow-sm hover:shadow-lg rounded"
                        >
                          <DeleteOutlined />
                        </button>
                      </div>
                    </div>
                  </>
                )
              })
            ) : (
              <div className="border border-dashed border-red-600 px-4 py-3 mt-3 mx-auto">
                <span className="text-red-600 font-semibold text-sm">
                  Hiện tại bạn chưa có địa chỉ để chúng tôi giao hàng !{' '}
                </span>
                <button
                  // disabled={districtWard || !products.length}
                  onClick={() => history.push('/address')}
                  className="text-blue-600 btn btn-addToCart uppercase mx-auto w-full mt-2 bg-transparent border border-blue-600 border-solid"
                >
                  Bấm vào đây để thêm địa chỉ giao hàng
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="xl:max-w-7xl mx-auto bg-white rounded mt-4">
        <div className="px-3 pt-3 pb-8">
          <div className="uppercase border-b border-gray-100 pb-1 text-gray-700 font-semibold  border-solid px-4">
            MÃ KHUYẾN MÃI/MÃ QUÀ TẶNG
          </div>
          <div className="px-3 pt-3 flex items-center">
            <h3>Mã KM/Quà tặng </h3>
            <input
              type="text"
              name="coupon"
              onChange={(e) => {
                setCoupons(e.target.value)
              }}
              value={coupons}
              placeholder="Nhập mã khuyến mãi/quà tặng"
              className="ml-2 py-2 border px-3 text-grey-darkest rounded w-2/6"
            />
            <button
              onClick={onHandleApplyCoupon}
              className="text-white btn mt-2 bg-red-500 border border-solid ml-3 px-4 py-2"
            >
              Áp dụng
            </button>
          </div>
        </div>
      </div>
      {/* dia chi giao hang */}
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
      <div className="xl:max-w-7xl mx-auto bg-white rounded mt-4">
        <div className="px-3 pt-3 pb-8">
          <div className="uppercase border-b border-gray-100 pb-1 text-gray-700 font-semibold  border-solid px-4">
            XÁC NHẬN THANH TOÁN
          </div>
          <div className="px-3 pt-3 text-right">
            <div className="  text-base font-semibold">
              <span className="text-base text-gray-500">Thành tiền:</span>{' '}
              <span className="text-lg text-gray-600">
                {formatPrice(total)}đ
              </span>
            </div>
            <div className=" text-base font-semibold">
              <span className="text-base text-gray-500">
                Sau khi áp dụng mã khuyến mãi:
              </span>{' '}
              <span className="text-lg text-red-500">
                {totalAfterDiscount > 0 ? formatPrice(totalAfterDiscount) : '0'}
                đ
              </span>
            </div>
            <div className=" text-blue-600 text-xl font-semibold">
              <span className="text-lg text-gray-600">
                Tổng Số Tiền (gồm VAT):
              </span>{' '}
              {totalAfterDiscount > 0
                ? formatPrice(totalAfterDiscount)
                : formatPrice(total)}
              đ
            </div>
          </div>
          <div className="flex items-center justify-end px-3">
            <button
              onClick={onHandleEmptyCart}
              disabled={!products.length}
              className="btn bg-red-500 px-4 py-3 uppercase text-white w-1/4 mt-2 ml-3 font-semibold"
            >
              Xóa đơn hàng
            </button>
            <button
              // disabled={!addressSaved || !products.length}
              onClick={onHandlePayMent}
              className="btn btn-primary px-4 py-3 uppercase text-right w-1/4 mt-2 font-semibold"
            >
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
CheckOut.propTypes = {}

export default CheckOut
