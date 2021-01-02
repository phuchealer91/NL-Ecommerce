import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { Card, Col, Row, Statistic, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserSideBar } from '../../components/navigation/SideBar'
import Invoice from '../../components/Order/Invoice'
import { formatPrice } from '../../helpers/formatPrice'
import { userOrder } from '../../redux/actions/cart'
import './Styles.scss'

function History(props) {
  const dispatch = useDispatch()
  const [isReady, setIsReady] = useState(false)
  let { userOrders } = useSelector((state) => state.cart)
  useEffect(() => {
    dispatch(userOrder())
    setIsReady(true)
  }, [dispatch])

  const columns = [
    {
      title: 'Title',
      dataIndex: 'Title',
      key: 'title',
      className: 'font-semibold text-lg',
    },
    {
      title: 'Price (VND)',
      dataIndex: 'Price',
      key: 'price',
    },
    {
      title: 'Brand',
      dataIndex: 'Brand',
      key: 'brand',
    },
    {
      title: 'Color',
      dataIndex: 'Color',
      key: 'color',
    },
    {
      title: 'Count',
      dataIndex: 'Count',
      key: 'count',
      className: 'text-center',
    },
    {
      title: 'Shipping',
      dataIndex: 'Shipping',
      key: 'shipping',
      className: 'text-center',
      render: (shipping) =>
        shipping === 'Yes' ? (
          <CheckCircleOutlined className="text-success" />
        ) : (
          <CloseCircleOutlined className="text-danger" />
        ),
    },
  ]

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
      <Row>
        <Col span={5}>
          <UserSideBar />
        </Col>
        <Col span={19}>
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
        </Col>
      </Row>
    </React.Fragment>
  )
}
History.propTypes = {}

export default History
