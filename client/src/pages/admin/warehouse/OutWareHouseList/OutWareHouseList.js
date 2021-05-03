import { Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { getOrdersCompleteds } from '../../../../apis/order'
import { AdminSideBar } from '../../../../components/navigation/SideBar'
import { formatPrice } from '../../../../helpers/formatPrice'
import TableOutWarehouse from './TableOutWarehouse'

OutWareHouseList.propTypes = {}

function OutWareHouseList(props) {
  const [ordersCompleted, setOrdersCompleted] = useState([])
  console.log('hello product', ordersCompleted)
  useEffect(() => {
    loadOrdersCompleteds()
  }, [])
  const loadOrdersCompleteds = () => {
    getOrdersCompleteds()
      .then((res) => {
        if (res.data) {
          setOrdersCompleted(res.data.orders)
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
  function getTotalPrice() {
    return ordersCompleted.reduce((curr, next) => {
      return curr + next.paymentIntent.amount
    }, 0)
  }
  return (
    <div>
      {' '}
      <Row>
        <Col xs={24} sm={24} md={5} lg={5}>
          <AdminSideBar />
        </Col>
        <Col xs={24} sm={24} md={19} lg={19}>
          <div className="w-full my-6 mx-3">
            <div className="flex items-center justify-between py-4 mx-4">
              <span className="text-gray-600 font-semibold text-lg">
                Quản lý Xuất kho
              </span>
            </div>
            <div className="bg-white shadow-md rounded mx-auto">
              <table className=" w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Mã sản phẩm</th>
                    <th className="py-3 px-6 text-left">Tên sản phẩm</th>
                    <th className="py-3 px-6 text-center">Số lượng</th>
                    <th className="py-3 px-6 text-center">Tổng tiền</th>
                    <th className="py-3 px-6 text-center">Trạng thái</th>
                    <th className="py-3 px-6 text-center">Ngày mua</th>
                  </tr>
                </thead>
                {ordersCompleted &&
                  ordersCompleted.map((order) => {
                    return <TableOutWarehouse key={order._id} order={order} />
                  })}
              </table>
              <div className="py-4 px-4 text-gray-600  text-base">
                Tổng tiền:
                <span className="pl-2 font-semibold text-green-600">
                  {formatPrice(getTotalPrice())}đ
                </span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default OutWareHouseList
