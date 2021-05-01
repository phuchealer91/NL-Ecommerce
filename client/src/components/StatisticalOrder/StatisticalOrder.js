import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { DatePicker, Select } from 'antd'
import moment from 'moment'
import { StatisticalOrderFilters, StatisticalOrders } from '../../apis/order'
import { toast } from 'react-toastify'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  Legend,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  ComposedChart,
  LabelList,
  Label,
} from 'recharts'
StatisticalOrder.propTypes = {}
const { Option } = Select

function StatisticalOrder(props) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [orderFiters, setOrderFilters] = useState([])

  useEffect(() => {
    StatisticalOrders({ value: 'day7Ago' }).then((res) => {
      if (res.data) {
        setOrderFilters(res.data.orderFilters)
      }
    })
  }, [])
  function onHandleSubmit(e) {
    e.preventDefault()
    if (endDate < startDate) {
      toast.error('Ngày sau phải lớn hơn ngày phía trước')
    } else {
      StatisticalOrderFilters({ startDate, endDate }).then((res) => {
        if (res.data) {
          setOrderFilters(res.data.orderFilters)
        }
      })
    }
  }
  function onHanleStartDate(value) {
    setStartDate(new Date(value))
  }
  function onHanleEndDate(value) {
    setEndDate(new Date(value))
  }
  function handleChange(value) {
    StatisticalOrders({ value }).then((res) => {
      if (res.data) {
        setOrderFilters(res.data.orderFilters)
      }
    })
  }
  console.log('orderFitersorderFitersorderFitersorderFiters', orderFiters)
  return (
    <div>
      <form onSubmit={onHandleSubmit}>
        <DatePicker onChange={onHanleStartDate} />
        <DatePicker onChange={onHanleEndDate} />
        <button type="submit" className="bg-blue-600 px-3 py-2 text-white">
          Lọc
        </button>
      </form>
      <div className="py-7">
        <Select
          defaultValue="day7Ago"
          style={{ width: 'auto' }}
          onChange={handleChange}
        >
          <Option value="day7Ago">7 ngày trước</Option>
          <Option value="currentWeek">Tuần này</Option>
          <Option value="monthAgo">Tháng trước</Option>
          <Option value="currentMonth">Tháng này</Option>
          <Option value="year365">365 ngày qua</Option>
        </Select>
      </div>
      <div className="my-8 ">
        <ResponsiveContainer width="100%" height={400} className="py-3">
          <ComposedChart data={orderFiters} className="py-3">
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="_id" type="category" />

            <YAxis />
            <Tooltip />
            <Legend />
            {/* <Area
              type="monotone"
              dataKey="count"
              fill="#8884d8"
              stroke="#8884d8"
            /> */}
            <Bar dataKey="count" fill="#8884d8">
              <LabelList dataKey="count" position="top" />
            </Bar>
            <Bar dataKey="total" fill="#82ca9d">
              <LabelList dataKey="total" position="top" />
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default StatisticalOrder
