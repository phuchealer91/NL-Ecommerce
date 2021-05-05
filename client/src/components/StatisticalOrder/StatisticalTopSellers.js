import { TaobaoSquareFilled } from '@ant-design/icons'
import { DatePicker, Select, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  LabelList,
  Legend,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  getTopSellers,
  getTotalOrderStatusMonths,
  StatisticalOrderFilters,
  StatisticalOrders,
} from '../../apis/order'
import { formatPrice } from '../../helpers/formatPrice'
StatisticalTopSellers.propTypes = {}
const { Option } = Select

function StatisticalTopSellers(props) {
  const [topSellers, setTopSellers] = useState([])

  useEffect(() => {
    getTopSellers().then((res) => {
      if (res.data) {
        setTopSellers(res.data.products)
      }
    })
  }, [])
  console.log('hello', topSellers)
  return (
    <>
      <div className="my-4 flex justify-center">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-4">
            <table className=" w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Mã đơn hàng</th>
                  <th className="py-3 px-6 text-left">Thông tin KH</th>
                  <th className="py-3 px-6 text-center">Tổng tiền</th>
                  <th className="py-3 px-6 text-center">Trạng thái</th>
                  <th className="py-3 px-6 text-center">Thời gian</th>
                </tr>
              </thead>
              {topSellers &&
                topSellers.map((order, idx) => {
                  return (
                    <tbody className="text-gray-600 text-sm font-light">
                      <tr className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="font-medium">
                              {' '}
                              {order?.paymentIntent?.id.substring(0, 10)}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          <ul className="text-xs list-disc">
                            <li className="pb-1 ">
                              Tên: {order?.deliveryAddress?.name}
                            </li>
                            <li className="pb-1 ">
                              ĐC: {order?.deliveryAddress?.mainAddress}
                            </li>
                            <li className="pb-1 ">
                              SĐT: {order?.deliveryAddress?.phone}
                            </li>
                          </ul>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span>
                            {formatPrice(order?.paymentIntent?.amount)}đ
                          </span>
                          {order?.applyCoupon?.discount && (
                            <span className="pl-1">
                              (
                              <small>
                                KM:{' '}
                                <span className="text-yellow-600">
                                  {order?.applyCoupon?.discount}%
                                </span>
                              </small>
                              )
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-6 text-center">
                          {order?.orderStatus === 'Đang chờ xác nhận' ? (
                            <Tag color="#999">{order?.orderStatus}</Tag>
                          ) : order?.orderStatus === 'Đang xử lý' ? (
                            <Tag color="orange-inverse">
                              {order?.orderStatus}
                            </Tag>
                          ) : order?.orderStatus === 'Đã bàn giao' ? (
                            <Tag color="green-inverse">
                              {order?.orderStatus}
                            </Tag>
                          ) : (
                            <Tag color="red-inverse">{order?.orderStatus}</Tag>
                          )}
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span className="">
                            {new Date(
                              order?.paymentIntent?.created * 1000
                            ).toLocaleString()}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  )
                })}
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default StatisticalTopSellers
