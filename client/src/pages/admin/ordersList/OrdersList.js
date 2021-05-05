import { Pagination, Spin, Steps } from 'antd'
import React, { useEffect, useState } from 'react'
import { getOrders } from '../../../apis/order'
import { AdminSideBar } from '../../../components/navigation/SideBar'
import Loading from '../../../components/Notify/Loading'
import TableOrderAdmin from '../../../components/ViewOrder/TableOrderAdmin'
import ViewOrderAdmin from '../../../components/ViewOrder/ViewOrderAdmin'
const { Step } = Steps
function OrdersList(props) {
  const [orders, setOrders] = useState([])
  const [page, setPage] = useState(1)
  const [ordersTotal, setOrdersTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    loadAllOrders()
  }, [page])

  const loadAllOrders = () => {
    setIsLoading(true)
    getOrders({ page }).then((res) => {
      if (res.data) {
        setIsLoading(false)
        setOrders(res.data.orders)
        setOrdersTotal(res.data.orderTotal)
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
            <span className="text-gray-500 text-xs">({ordersTotal})</span>
          </div>
          <div className="w-full">
            <div className="bg-white shadow-md rounded my-6">
              <table className=" w-full table-auto text-center ">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                    <th className="py-3 px-4 text-left">Mã đơn hàng</th>
                    <th className="py-3 px-4 text-left">Tên khách hàng</th>
                    <th className="py-3 px-4 text-left">Tổng tiền</th>
                    <th className="py-3 px-4 text-left">Thời gian</th>
                    <th className="py-3 px-4 text-left">Trạng thái</th>
                    <th className="py-3 px-4 text-left">Thao tác</th>
                  </tr>
                </thead>
                {isLoading ? (
                  <Loading />
                ) : (
                  orders &&
                  orders.map((order) => (
                    <TableOrderAdmin
                      order={order}
                      loadAllOrders={loadAllOrders}
                    />
                  ))
                )}
              </table>
              <div className="py-6 flex justify-center items-center">
                <Pagination
                  current={page}
                  total={(ordersTotal / 10) * 10}
                  onChange={(value) => setPage(value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
OrdersList.propTypes = {}

export default OrdersList
