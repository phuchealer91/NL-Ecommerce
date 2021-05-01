import {
  ShoppingCartOutlined,
  TagOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getTotalUserss } from '../../apis/cart'
import { getTotalOrderss } from '../../apis/order'
import { getProductsCounts } from '../../apis/product'
import AdminSideBar from '../../components/navigation/SideBar/AdminSideBar'
import StatisticalOrder from '../../components/StatisticalOrder/StatisticalOrder'
import StatisticalOrderFilter from '../../components/StatisticalOrder/StatisticalOrderFilter'

DashBoard.propTypes = {}

function DashBoard(props) {
  const [totalProduct, setTotalProduct] = useState(0)
  const [totalOrder, setTotalOrder] = useState(0)
  const [totalUser, setTotalUser] = useState(0)

  useEffect(() => {
    loadTotalProduct()
    loadTotalOrders()
    loadTotalUsers()
  }, [])
  const loadTotalProduct = () => {
    getProductsCounts()
      .then((res) => {
        setTotalProduct(res.data.total)
      })
      .catch((error) => {
        console.log('Lỗi', error)
      })
  }
  const loadTotalOrders = () => {
    getTotalOrderss()
      .then((res) => {
        setTotalOrder(res.data.total)
      })
      .catch((error) => {
        console.log('Lỗi', error)
      })
  }
  const loadTotalUsers = () => {
    getTotalUserss()
      .then((res) => {
        setTotalUser(res.data.total)
      })
      .catch((error) => {
        console.log('Lỗi', error)
      })
  }
  return (
    <React.Fragment>
      <div className="w-full mx-auto flex ">
        <div className="w-1/4">
          <AdminSideBar />
        </div>
        {/* Thông báo: <UserLogined /> */}
        <div className="w-3/4 mx-auto rounded mt-8">
          <div className="w-full">
            <div className="py-3">
              <StatisticalOrder />
            </div>
          </div>
          <div className="uppercase pb-4 text-gray-700 font-semibold  border-solid">
            TỔNG QUAN TRẠNG THÁI CÁC ĐƠN HÀNG
          </div>
          <div className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2">
            <div className="flex shadow-lg bg-white 0 md:w-1/4 mr-2 rounded-md">
              <div className="bg-green-500 grid place-items-center rounded-l-md">
                <TagOutlined
                  style={{
                    fontSize: '28px',
                    color: '#fff',
                    padding: '12px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                />
              </div>
              <div className="p-4 flex flex-col text-center mx-auto">
                <div className="text-gray-600 text-2xl font-semibold">
                  {totalProduct}
                </div>
                <Link
                  to="/admin/list-products"
                  className="text-gray-700 text-sm"
                >
                  SẢN PHẨM
                </Link>
              </div>
            </div>
            <div className="flex shadow-lg bg-white 0 md:w-1/4 mr-2 rounded-md">
              <div className="bg-blue-600 grid place-items-center rounded-l-md">
                <ShoppingCartOutlined
                  style={{
                    fontSize: '28px',
                    color: '#fff',
                    padding: '12px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                />
              </div>
              <div className="p-4 flex flex-col text-center mx-auto">
                <div className="text-gray-600 text-2xl font-semibold">
                  {totalOrder}
                </div>
                <Link to="/admin/order" className="text-gray-700 text-sm">
                  TỔNG SỐ ĐƠN HÀNG
                </Link>
              </div>
            </div>
            <div className="flex shadow-lg bg-white 0 md:w-1/4 mr-2 rounded-md">
              <div className="bg-red-600 grid place-items-center rounded-l-md">
                <UsergroupAddOutlined
                  style={{
                    fontSize: '28px',
                    color: '#fff',
                    padding: '12px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                />
              </div>
              <div className="p-4 flex flex-col text-center mx-auto">
                <div className="text-gray-600 text-2xl font-semibold">
                  {totalUser}
                </div>
                <Link to="/admin/order" className="text-gray-700 text-sm">
                  THÀNH VIÊN
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default DashBoard
