import { Steps } from 'antd'
import React, { useEffect, useState } from 'react'
import { getOrders } from '../../../apis/order'
import { AdminSideBar } from '../../../components/navigation/SideBar'
import TableOrderAdmin from '../../../components/ViewOrder/TableOrderAdmin'
import ViewOrderAdmin from '../../../components/ViewOrder/ViewOrderAdmin'
const { Step } = Steps
function OrdersList(props) {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    loadAllOrders()
  }, [])

  const loadAllOrders = () => {
    getOrders().then((res) => {
      if (res.data) {
        setOrders(res.data.orders)
      }
    })
  }

  return (
    <React.Fragment>
      <div className="w-full mx-auto flex ">
        <div className="w-1/4">
          <AdminSideBar />
        </div>
        <div className="w-3/4 mx-auto rounded mt-4 px-4 border">
          <div className="uppercase border-b py-4 border-gray-100 pb-1 text-gray-700 font-semibold  border-solid px-4">
            CÁC ĐƠN HÀNG CỦA KHÁCH HÀNG{' '}
            <span className="text-gray-500 text-xs">({orders.length})</span>
          </div>
          <div className="w-full">
            <div className="bg-white shadow-md rounded my-6">
              <table className=" w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Mã đơn hàng</th>
                    <th className="py-3 px-6 text-left">Tên khách hàng</th>
                    <th className="py-3 px-6 text-center">Tổng tiền</th>
                    <th className="py-3 px-6 text-center">Thời gian</th>
                    <th className="py-3 px-6 text-center">Trạng thái</th>
                    <th className="py-3 px-6 text-center">Thao tác</th>
                  </tr>
                </thead>
                {orders &&
                  orders.map((order) => (
                    <TableOrderAdmin
                      order={order}
                      loadAllOrders={loadAllOrders}
                    />
                  ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
OrdersList.propTypes = {}

export default OrdersList
