import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons'
import { Card, Col, Row, Select, Statistic, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AdminSideBar } from '../../../components/navigation/SideBar'
import { formatPrice } from '../../../helpers/formatPrice'
import { getOrder, updateOrderStatus } from '../../../redux/actions/order'
function OrdersList(props) {
  const { Option } = Select
  const dispatch = useDispatch()
  const { ordersList, ordersListChange } = useSelector((state) => state.order)
  const [values, setValues] = useState(null)
  useEffect(() => {
    dispatch(getOrder())
  }, [ordersListChange, dispatch])
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
  const arrStatus = [
    'Not Processed',
    'Cash On Delivery',
    'Processing',
    'Dispatched',
    'Cannelled',
    'Completed',
  ]
  function handleChange(value) {
    let xx = { orderId: values, orderStatus: value }

    dispatch(updateOrderStatus(xx))
  }
  return (
    <React.Fragment>
      <Row>
        <Col xs={24} sm={24} md={5} lg={5}>
          <AdminSideBar />
        </Col>
        <Col xs={24} sm={24} md={19} lg={19}>
          <div className="category">
            <h3 className="text-2xl mb-5">ORDERS </h3>
            {ordersList &&
              ordersList.map((userOrders) => {
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
                              <Select
                                defaultValue={userOrders?.orderStatus}
                                style={{
                                  width: 204,
                                  border: '0',
                                  backgroundColor: 'transparent',
                                }}
                                onChange={handleChange}
                                onClick={() => setValues(userOrders._id)}
                              >
                                {arrStatus.map((arr) => {
                                  return (
                                    <Option key={arr} value={arr}>
                                      {arr.toUpperCase()}
                                    </Option>
                                  )
                                })}
                              </Select>
                            </Tag>
                          )}
                          className="mb-2 w-60"
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
                  </Card>
                )
              })}
          </div>
        </Col>
      </Row>
    </React.Fragment>
  )
}
OrdersList.propTypes = {}

export default OrdersList
