import { Steps, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import ModalImage from 'react-modal-image'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { userOrders } from '../../apis/cart'
import { updatedOrderStatus } from '../../apis/order'
import { getTotalOrdersStatuss } from '../../apis/cart'
import imageDefault from '../../assets/images/default-image.jpg'
import { UserSideBar } from '../../components/navigation/SideBar'
import { formatPrice } from '../../helpers/formatPrice'
import './Styles.scss'
const { Step } = Steps

function History(props) {
  // const [isReady, setIsReady] = useState(false)
  const [isChange, setIsChange] = useState(false)
  const [isChangeStatus, setIsChangeStatus] = useState(false)
  const [userOrder, setuserOrder] = useState([])
  const [isCancel, setIsCancel] = useState(false)
  const [totalWConfirm, setTotalWConfirm] = useState(0)
  const [totalProcess, setTotalTotalProcess] = useState(0)
  const [totalCompleted, setTotalTotalCompleted] = useState(0)
  const [totalCancel, setTotalCancel] = useState(0)
  const [skips, setSkips] = useState(0)
  const [limits, setLimits] = useState(4)
  useEffect(() => {
    loadTotalWConfirm()
    loadTotalProcess()
    loadTotalCompleted()
    loadTotalCancel()
  }, [userOrder])
  useEffect(() => {
    const variables = {
      skip: skips,
      limit: limits,
    }
    loaduserOrder(variables)
  }, [isChange])
  console.log('userOrderuserOrderuserOrderuserOrderuserOrder', userOrder)
  const arrStatus = ['Đang chờ xác nhận', 'Đang xử lý', 'Đã bàn giao', 'Hủy']
  const loadTotalWConfirm = () => {
    getTotalOrdersStatuss({ status: arrStatus[0] })
      .then((res) => {
        if (res.data) {
          setTotalWConfirm(res.data.totalStatus)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const loadTotalProcess = () => {
    getTotalOrdersStatuss({ status: arrStatus[1] })
      .then((res) => {
        if (res.data) {
          setTotalTotalProcess(res.data.totalStatus)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const loadTotalCompleted = () => {
    getTotalOrdersStatuss({ status: arrStatus[2] })
      .then((res) => {
        if (res.data) {
          setTotalTotalCompleted(res.data.totalStatus)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const loadTotalCancel = () => {
    getTotalOrdersStatuss({ status: arrStatus[3] })
      .then((res) => {
        if (res.data) {
          setTotalCancel(res.data.totalStatus)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const loaduserOrder = (variables) =>
    userOrders(variables)
      .then((res) => {
        if (res.data) {
          setuserOrder([...userOrder, ...res.data.userOrders])
        }
      })
      .catch((error) => {})

  // const showPDFDownloadLink = (userOrder) => {
  //   return (
  //     <PDFDownloadLink
  //       document={<Invoice userOrders={userOrder} />}
  //       fileName="invoice.pdf"
  //       className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
  //     >
  //       Download PDF
  //     </PDFDownloadLink>
  //   )
  // }
  function onHandleCancelOrder(orderId) {
    updatedOrderStatus(orderId, 'Hủy')
      .then((res) => {
        if (res.data) {
          toast.success('Hủy đơn hàng thành công')
          setIsCancel(!isCancel)
          setIsChange(true)
          loaduserOrder()
        }
      })
      .catch((error) => {
        toast.error('Hủy đơn hàng thất bại')
      })
  }
  function onHandleBackOrder(orderId) {
    updatedOrderStatus(orderId, 'Đang chờ xác nhận')
      .then((res) => {
        if (res.data) {
          toast.success('Đặt lại đơn hàng thành công')
          setIsCancel(!isCancel)
          setIsChange(true)
          loaduserOrder()
        }
      })
      .catch((error) => {
        toast.error('Đặt lại đơn hàng thất bại')
      })
  }
  function onHandleLoadMore() {
    let Skip = skips + limits
    const variables = {
      skip: skips,
      limit: limits,
    }
    loaduserOrder(variables)
    setSkips(Skip)
  }
  return (
    <React.Fragment>
      <div className="w-full mx-auto flex ">
        <div className="w-1/4">
          <UserSideBar />
        </div>
        <div className="w-3/4 mx-auto rounded mt-8">
          <div className="uppercase pb-4 text-gray-700 font-semibold  border-solid">
            TỔNG QUAN TRẠNG THÁI CÁC ĐƠN HÀNG
          </div>
          <div className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2">
            <div className="shadow-lg bg-white border-l-8 border-gray-400  mb-2 p-2 md:w-1/4 mr-2">
              <div className="p-4 flex flex-col text-center">
                <div className="text-gray-600 text-2xl font-semibold">
                  {totalWConfirm}
                </div>
                <div className="text-gray-700 text-base">ĐANG CHỜ XÁC NHẬN</div>
              </div>
            </div>
            <div className="shadow-lg bg-white border-l-8 border-yellow-500  mb-2 p-2 md:w-1/4 mr-2">
              <div className="p-4 flex flex-col text-center">
                <div className="text-gray-600 text-2xl font-semibold">
                  {totalProcess}
                </div>
                <div className="text-gray-700 text-base">ĐANG CHỜ XỬ LÝ</div>
              </div>
            </div>
            <div className="shadow-lg bg-white border-l-8 border-green-600  mb-2 p-2 md:w-1/4 mr-2">
              <div className="p-4 flex flex-col text-center">
                <div className="text-gray-600 text-2xl font-semibold">
                  {totalCompleted}
                </div>
                <div className="text-gray-700 text-base">ĐÃ BÀN GIAO</div>
              </div>
            </div>
            <div className="shadow-lg bg-white border-l-8 border-red-600  mb-2 p-2 md:w-1/4 mr-2">
              <div className="p-4 flex flex-col text-center">
                <div className="text-gray-600 text-2xl font-semibold">
                  {totalCancel}
                </div>
                <div className="text-gray-700 text-base">HỦY</div>
              </div>
            </div>
          </div>
          {userOrder && userOrder.length > 0 ? (
            <div className=" mt-4 px-4 border">
              <div className="uppercase border-b py-4 border-gray-100 pb-1 text-gray-700 font-semibold  border-solid px-4">
                CÁC ĐƠN HÀNG CỦA BẠN{' '}
                <span className="text-gray-500 text-xs">
                  ({userOrder?.length})
                </span>
              </div>

              {userOrder &&
                userOrder.map((order, idx) => {
                  return (
                    <div className="px-4 pt-4 pb-8 bg-white mt-4 rounded shadow-md">
                      <div className="uppercase pb-1 text-gray-700 font-semibold  border-solid">
                        CHI TIẾT ĐƠN HÀNG{' '}
                        <span className="text-lg text-red-600">{`#${
                          idx + 1
                        }`}</span>
                      </div>
                      <div className="bg-white rounded my-3">
                        <div className="flex items-center justify-between">
                          <Tag color="warning">
                            {order?.orderStatus?.toUpperCase()}
                          </Tag>
                          {/* {showPDFDownloadLink(order)} */}
                        </div>

                        {/* <Tag color="warning">{
                                order?.paymentIntent?.status}</Tag> */}
                        <div className="mt-3">
                          Mã đơn hàng:{' '}
                          <span className="text-sm text-gray-600 font-semibold">
                            {order?.paymentIntent?.id}
                          </span>
                        </div>
                        <div className="mt-3">
                          Ngày mua:{' '}
                          <span className="text-sm text-gray-600 font-semibold">
                            {/* {order?.paymentIntent?.currency.toUpperCase()} */}
                            {new Date(
                              order?.paymentIntent?.created * 1000
                            ).toLocaleString()}
                          </span>
                        </div>
                        <div className="mt-3">
                          Tổng tiền:{' '}
                          <span className="text-sm text-gray-600 font-semibold">
                            {formatPrice(order?.paymentIntent?.amount)}đ
                          </span>
                        </div>
                      </div>
                      <div className="bg-white rounded mt-3 flex ">
                        <div className="w-3/6 border px-3 py-3 mr-3">
                          <span className="text-sm text-blue-600 uppercase border-b border-solid border-gray-100 py-3 w-full">
                            Thông tin người nhận
                          </span>
                          <div className="text-sm text-gray-500 mt-3">
                            <div className="px-3 pt-3">
                              <div className="text-base text-gray-600 font-semibold flex items-center justify-between">
                                <span>{order?.deliveryAddress?.name}</span>
                              </div>
                              <div className="text-base text-gray-600">
                                <span className="text-sm text-gray-500">
                                  Địa chỉ:{' '}
                                </span>
                                {order?.deliveryAddress?.fullAddress} -{' '}
                                {order?.deliveryAddress?.mainAddress}
                              </div>
                              <div className="text-base text-gray-600">
                                <span className="text-sm text-gray-500">
                                  Điện thoại:{' '}
                                </span>
                                {order?.deliveryAddress?.phone}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-3/6 border px-3 py-3">
                          <span className="text-sm text-blue-600 uppercase border-b border-solid border-gray-100 py-3 w-full">
                            phương thức thanh toán
                          </span>
                          <div className="text-sm text-gray-500 pt-3 ">
                            {order?.paymentIntent?.payment_method_types[0].toUpperCase()}
                          </div>
                        </div>
                      </div>
                      <div className="bg-white rounded mt-3 flex items-center border px-5 py-5 justify-center">
                        <Steps
                          current={
                            order?.orderStatus === 'Đang xử lý'
                              ? 1
                              : order?.orderStatus === 'Đã bàn giao' ||
                                order?.orderStatus === 'Hủy'
                              ? 2
                              : 0
                          }
                          percent={60}
                          size="default"
                          status={
                            order?.orderStatus === 'Đang xử lý'
                              ? 'process'
                              : order?.orderStatus === 'Đã bàn giao'
                              ? 'finish'
                              : order?.orderStatus === 'Hủy'
                              ? 'error'
                              : 'process'
                          }
                        >
                          <Step
                            title="Đang chờ xác nhận"
                            description="Chờ chúng tôi xác nhận đơn hàng nhé"
                          />
                          <Step
                            title="Đang xử lý"
                            description="Chúng tôi đang xử lý đơn hàng."
                          />
                          <Step
                            title="Đã bàn giao"
                            description="Chúng tôi đã bàn giao đơn hàng."
                          />
                        </Steps>
                      </div>
                      <div className="bg-white rounded mt-3 flex items-center ">
                        <div className="px-3 pt-3 pb-8 w-full">
                          <div className="uppercase border-b border-gray-100 pb-1 text-gray-700 font-semibold  border-solid py-3">
                            TỔNG QUAN SẢN PHẨM TRONG ĐƠN HÀNG
                          </div>
                          {order &&
                            order.products?.map((item) => {
                              return (
                                <div className="hidden md:block">
                                  <div className="py-3 flex-row justify-between items-center mb-0 hidden md:flex">
                                    <div className="w-full lg:w-align xl:w-align flex flex-row items-start border-b-0 border-grey-dark pt-0 pb-0 pl-3 text-left">
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
                                        {formatPrice(
                                          item.product.price * item.count
                                        )}
                                        đ
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                        </div>
                      </div>

                      <div className="px-4 my-4 ">
                        {isCancel ? (
                          <button
                            onClick={() => onHandleBackOrder(order._id)}
                            className="bg-blue-500 hover:bg-white text-white font-semibold hover:text-blue-500 py-2 px-4 hover:border border-solid border-blue-500 rounded"
                          >
                            Đặt lại đơn hàng
                          </button>
                        ) : (
                          <button
                            onClick={() => onHandleCancelOrder(order._id)}
                            className="bg-red-500 hover:bg-white text-white font-semibold hover:text-red-500 py-2 px-4 hover:border border-solid border-red-500 rounded"
                          >
                            Hủy đơn hàng
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
            </div>
          ) : (
            ' '
          )}
          {userOrder && userOrder.length > 3 ? (
            <div className="my-10 text-center">
              <button
                onClick={onHandleLoadMore}
                className="bg-gray-500 hover:bg-white text-white font-semibold hover:text-gray-500 py-2 px-4 hover:border border-solid border-gray-500 rounded"
              >
                Load more
              </button>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </React.Fragment>
  )
}
History.propTypes = {}

export default History
