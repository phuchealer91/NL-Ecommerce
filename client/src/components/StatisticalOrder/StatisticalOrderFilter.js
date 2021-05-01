import React from 'react'
import PropTypes from 'prop-types'
import { DatePicker, Select } from 'antd'
const { Option } = Select
StatisticalOrderFilter.propTypes = {}

function StatisticalOrderFilter(props) {
  function onHandleSubmit(e) {}
  function handleChange(value) {
    console.log('valuevaluevaluevaluevaluevaluevalue', value)
  }

  return (
    <div>
      <form onSubmit={onHandleSubmit}>
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
      </form>
    </div>
  )
}

export default StatisticalOrderFilter
