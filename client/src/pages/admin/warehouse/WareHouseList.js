import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'antd'
import { AdminSideBar } from '../../../components/navigation/SideBar'
import { useState } from 'react'
import TableReceipts from './TableReceipts'
import { getUserReceipts } from '../../../apis/cart'

WareHouseList.propTypes = {}

function WareHouseList(props) {
  const [userReceipts, setUserReceipts] = useState([])
  useEffect(() => {
    loadUserReceipts()
  }, [])
  const loadUserReceipts = () => {
    getUserReceipts()
      .then((res) => {
        if (res.data) {
          setUserReceipts(res.data.receipts)
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
  return (
    <div>
      {' '}
      <Row>
        <Col xs={24} sm={24} md={5} lg={5}>
          <AdminSideBar />
        </Col>
        <Col xs={24} sm={24} md={19} lg={19}>
          <div className="w-full">
            <div className="bg-white shadow-md rounded my-6">
              <table className=" w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Mã đơn hàng</th>
                    <th className="py-3 px-6 text-left">Nhà cung cấp</th>
                    <th className="py-3 px-6 text-center">Ngày lập</th>
                    <th className="py-3 px-6 text-center">Trạng thái</th>
                    <th className="py-3 px-6 text-center">Chi tiết</th>
                    <th className="py-3 px-6 text-center">Thao tác</th>
                  </tr>
                </thead>
                {userReceipts &&
                  userReceipts.map((receipt, idx) => {
                    return <TableReceipts receipt={receipt} idx={idx} />
                  })}
              </table>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default WareHouseList
