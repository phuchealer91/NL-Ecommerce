import { TaobaoSquareFilled } from '@ant-design/icons'
import { DatePicker, Select } from 'antd'
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
  getTotalOrderStatusMonths,
  StatisticalOrderFilters,
  StatisticalOrders,
} from '../../apis/order'
StatisticalOrderStatus.propTypes = {}
const { Option } = Select

function StatisticalOrderStatus(props) {
  const [orderStatus, setOrderStatus] = useState([])

  useEffect(() => {
    getTotalOrderStatusMonths().then((res) => {
      if (res.data) {
        setOrderStatus(res.data.orderStatus)
      }
    })
  }, [])
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }
  return (
    <>
      <div className="my-8 ">
        {/* <ResponsiveContainer width="100%" height="100%" className="py-4"> */}
        <PieChart width={400} height={400}>
          <Pie
            data={orderStatus}
            cx="50%"
            cy="50%"
            // labelLine={true}
            label={renderCustomizedLabel}
            // outerRadius={80}
            fill="#8884d8"
            dataKey="count"
            nameKey="_id"
          >
            {orderStatus.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
        {/* </ResponsiveContainer> */}
      </div>
    </>
  )
}

export default StatisticalOrderStatus
