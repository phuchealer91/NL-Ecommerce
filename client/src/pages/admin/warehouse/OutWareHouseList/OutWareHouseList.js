import { Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { getOrdersCompleteds } from '../../../../apis/order'
import { Layouts } from '../../../../components/navigation/Layouts/Layouts'
import { AdminSideBar } from '../../../../components/navigation/SideBar'
import SectionTitle from '../../../../components/SectionTitle/SectionTitle'
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
      <Layouts>
        <SectionTitle> Quản lý xuất kho</SectionTitle>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h3 className="text-sm text-gray-600 my-4">
            {' '}
            Danh sách các sản phẩm bán ra{' '}
            <span className="font-semibold">({ordersCompleted.length})</span>
          </h3>
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
      </Layouts>
    </div>
  )
}

export default OutWareHouseList
