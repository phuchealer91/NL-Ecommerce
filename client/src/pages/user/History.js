import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { Card, Col, Row, Statistic, Steps, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserSideBar } from '../../components/navigation/SideBar'
import Invoice from '../../components/Order/Invoice'
import { formatPrice } from '../../helpers/formatPrice'
import { userOrder } from '../../redux/actions/cart'
import './Styles.scss'
import imageDefault from '../../assets/images/default-image.jpg'
import { Link } from 'react-router-dom'
import ModalImage from 'react-modal-image'
const { Step } = Steps

function History(props) {
  const dispatch = useDispatch()
  const [isReady, setIsReady] = useState(false)
  let { userOrders } = useSelector((state) => state.cart)
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    dispatch(userOrder())
    setIsReady(true)
  }, [dispatch])

  console.log('userOrdersuserOrdersuserOrdersuserOrders', userOrders)

  const showPDFDownloadLink = (userOrders) => (
    <PDFDownloadLink
      document={<Invoice userOrders={userOrders} />}
      fileName="invoice.pdf"
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
    >
      Download PDF
    </PDFDownloadLink>
  )

  return (
    <React.Fragment>
      <div className="w-full mx-auto flex ">
        <div className="w-1/4">
          <UserSideBar />
        </div>
        {/* <Col span={19}>
          <div className="p-4">
            <h3 className="uppercase font-bold py-3 text-lg text-center ">
              User purchase orders{' '}
              <span className="text-red-600">({userOrders.length})</span>
            </h3>
            {userOrders &&
              userOrders.map((userOrders) => {
                return (
                  <Card
                    key={userOrders._id}
                    style={{
                      width: '100%',
                      marginBottom: '20px',
                    }}
                    className="border-green-400"
                  >
                    <div className="grid grid-cols-2 p-2">
                      <ul>
                        <li>
                          <Statistic
                            title="ORDER ID"
                            value={userOrders?.paymentIntent?.id}
                            className="mb-2"
                          />
                          <Statistic
                            title="AMOUNT"
                            value={formatPrice(
                              userOrders?.paymentIntent?.amount
                            )}
                            className="mb-2"
                          />
                          <Statistic
                            title="CURRENCY"
                            value={userOrders?.paymentIntent?.currency.toUpperCase()}
                            className="mb-2"
                          />
                        </li>
                      </ul>
                      <ul>
                        <Statistic
                          title="PAYMENT"
                          valueRender={() => (
                            <Tag
                              icon={
                                userOrders?.paymentIntent?.status ===
                                'Not Processed' ? (
                                  <CheckCircleOutlined />
                                ) : (
                                  <SyncOutlined spin />
                                )
                              }
                              color={
                                userOrders?.orderStatus === 'Not Processed'
                                  ? 'default'
                                  : userOrders?.orderStatus ===
                                    'Cash On Delivery'
                                  ? 'magenta'
                                  : userOrders?.orderStatus === 'Processing'
                                  ? 'processing'
                                  : userOrders?.orderStatus === 'Dispatched'
                                  ? 'purple'
                                  : userOrders?.orderStatus === 'Cannelled'
                                  ? 'error'
                                  : userOrders?.orderStatus === 'Completed'
                                  ? 'success'
                                  : 'default'
                              }
                              className="flex items-center font-semibold"
                            >
                              {userOrders?.orderStatus?.toUpperCase()}
                            </Tag>
                          )}
                          className="mb-2 w-40"
                        />
                        <Statistic
                          title="METHOD"
                          value={userOrders?.paymentIntent?.payment_method_types[0].toUpperCase()}
                          className="mb-2"
                        />
                        <Statistic
                          title="ORDERED ON"
                          value={new Date(
                            userOrders?.paymentIntent?.created * 1000
                          ).toLocaleString()}
                          className="mb-2"
                        />
                      </ul>
                    </div>
                    <div className="p-2 pl-0">
                      <Table
                        dataSource={
                          userOrders.products &&
                          userOrders.products.map((item) => ({
                            Id: item._id,
                            Title: item.product?.title,
                            Price: formatPrice(item.product?.price),
                            Brand: item.product?.brand,
                            Color: item.color,
                            Count: item.count,
                            Shipping: item.product?.shipping,
                          }))
                        }
                        columns={columns}
                        rowKey="Id"
                        tableLayout="auto"
                        pagination={false}
                        bordered
                      />
                    </div>
                    <div className="py-3">
                      {isReady ? showPDFDownloadLink(userOrders) : ''}
                    </div>
                  </Card>
                )
              })}
          </div>
        </Col> */}
        <div className="w-3/4 mx-auto rounded mt-4">
          <div className="uppercase border-b py-4 border-gray-100 pb-1 text-gray-700 font-semibold  border-solid px-4">
            CÁC ĐƠN HÀNG CỦA BẠN{' '}
            <span className="text-gray-500 text-xs">({userOrders.length})</span>
          </div>
          {userOrders &&
            userOrders.map((userOrders) => {
              return (
                <div className="px-4 pt-4 pb-8 bg-white mt-4 rounded">
                  <div className="uppercase pb-1 text-gray-700 font-semibold  border-solid">
                    CHI TIẾT ĐƠN HÀNG
                  </div>
                  <div className="bg-white rounded my-3">
                    <Tag color="warning">
                      {userOrders?.orderStatus?.toUpperCase()}
                    </Tag>
                    {/* <Tag color="warning">{
                                userOrders?.paymentIntent?.status}</Tag> */}
                    <div className="mt-3">
                      Mã đơn hàng:{' '}
                      <span className="text-sm text-gray-600 font-semibold">
                        {userOrders?.paymentIntent?.id}
                      </span>
                    </div>
                    <div className="mt-3">
                      Ngày mua:{' '}
                      <span className="text-sm text-gray-600 font-semibold">
                        {/* {userOrders?.paymentIntent?.currency.toUpperCase()} */}
                        {new Date(
                          userOrders?.paymentIntent?.created * 1000
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-3">
                      Tổng tiền:{' '}
                      <span className="text-sm text-gray-600 font-semibold">
                        {formatPrice(userOrders?.paymentIntent?.amount)}đ
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
                            <span>{userOrders?.deliveryAddress?.name}</span>
                          </div>
                          <div className="text-base text-gray-600">
                            <span className="text-sm text-gray-500">
                              Địa chỉ:{' '}
                            </span>
                            {userOrders?.deliveryAddress?.fullAddress} -{' '}
                            {userOrders?.deliveryAddress?.mainAddress}
                          </div>
                          <div className="text-base text-gray-600">
                            <span className="text-sm text-gray-500">
                              Điện thoại:{' '}
                            </span>
                            {userOrders?.deliveryAddress?.phone}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-3/6 border px-3 py-3">
                      <span className="text-sm text-blue-600 uppercase border-b border-solid border-gray-100 py-3 w-full">
                        phương thức thanh toán
                      </span>
                      <div className="text-sm text-gray-500 pt-3 ">
                        {userOrders?.paymentIntent?.payment_method_types[0].toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded mt-3 flex items-center border px-5 py-5 justify-center">
                    <Steps
                      current={
                        userOrders?.orderStatus === 'Đang xử lý'
                          ? 1
                          : userOrders?.orderStatus === 'Đã bàn giao'
                          ? 2
                          : 0
                      }
                      percent={60}
                      size="default"
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
                      {userOrders.products.map((item) => {
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
                                  {formatPrice(item.product.price * item.count)}
                                  đ
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
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
History.propTypes = {}

export default History
