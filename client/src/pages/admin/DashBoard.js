import {
  ApartmentOutlined,
  ShoppingCartOutlined,
  TagOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
import { Layout } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getTotalUserss } from '../../apis/cart'
import { getTotalOrderss } from '../../apis/order'
import { getProductsCounts } from '../../apis/product'
import NavBar from '../../components/navigation/NavBar/NavBar'
import SideBars from '../../components/navigation/SideBars/SideBars'
import AdminSideBar from '../../components/navigation/SideBar/AdminSideBar'
import StatisticalOrder from '../../components/StatisticalOrder/StatisticalOrder'
import StatisticalOrderStatus from '../../components/StatisticalOrder/StatisticalOrderStatus'
import TopicMenu from '../../components/navigation/TopicMenu'
import HeaderAdmin from '../../components/navigation/Header/HeaderAdmin'
import PageTitle from '../../components/SectionTitle/PageTitle'

DashBoard.propTypes = {}

function DashBoard(props) {
  const [totalProduct, setTotalProduct] = useState(0)
  const [totalOrder, setTotalOrder] = useState(0)
  const [totalUser, setTotalUser] = useState(0)
  const topics = ['First topic', 'Second topic', 'Third topic']
  const [contentIndex, setContentIndex] = useState(0)
  const [selectedKey, setSelectedKey] = useState('0')
  const changeSelectedKey = (event) => {
    const key = event.key
    setSelectedKey(key)
    setContentIndex(+key)
  }
  const Menu = <AdminSideBar />

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
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <div className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
          <NavBar menu={Menu} />
          <SideBars menu={Menu} />
        </div>

        <div className="flex flex-col flex-1 w-full">
          <div className="pb-4 md:hidden ">
            <NavBar menu={Menu} />
          </div>
          <HeaderAdmin />
          <div className=" h-full overflow-y-auto">
            <div className=" container px-6 mx-auto grid">
              <PageTitle>TỔNG QUAN TRẠNG THÁI CÁC ĐƠN HÀNG</PageTitle>

              <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                {/* Card */}
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                  <div className="p-3 mr-4 text-yellow-500 bg-yellow-100 rounded-full dark:text-yellow-100 dark:bg-yellow-500">
                    <ApartmentOutlined
                      size={20}
                      style={{ width: '20px', height: '20px' }}
                    />
                  </div>

                  <div>
                    <Link
                      to="/admin/list-products"
                      className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
                    >
                      Tổng sản phẩm
                    </Link>

                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                      {totalProduct}
                    </p>
                  </div>
                </div>

                {/* Card */}
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                  <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
                    <ShoppingCartOutlined
                      size={20}
                      style={{ width: '20px', height: '20px' }}
                    />
                  </div>

                  <div>
                    <Link
                      to="/admin/order"
                      className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
                    >
                      Tổng số đơn hàng
                    </Link>

                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                      {totalOrder}
                    </p>
                  </div>
                </div>
                {/* Card */}
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                  <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
                    <UsergroupAddOutlined
                      size={20}
                      style={{ width: '20px', height: '20px' }}
                    />
                  </div>

                  <div>
                    <Link
                      to="/admin/order"
                      className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
                    >
                      Thành viên
                    </Link>

                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                      {totalUser}
                    </p>
                  </div>
                </div>
                {/* Card */}
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                  <div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Pending contacts
                    </p>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                      35
                    </p>
                  </div>
                </div>
              </div>
              {/* hello */}

              <div className="w-full">
                <div className="py-3">
                  <StatisticalOrder />
                </div>
                <div className="py-3">
                  <StatisticalOrderStatus />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default DashBoard
