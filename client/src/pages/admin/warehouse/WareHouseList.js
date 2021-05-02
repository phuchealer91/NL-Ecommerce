import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'antd'
import { AdminSideBar } from '../../../components/navigation/SideBar'

WareHouseList.propTypes = {}

function WareHouseList(props) {
  useEffect()
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
                    <th className="py-3 px-6 text-left">Nhà CC</th>
                    <th className="py-3 px-6 text-left">Sản phẩm</th>
                    <th className="py-3 px-6 text-center">SL nhập</th>
                    <th className="py-3 px-6 text-center">Giá nhập</th>
                    <th className="py-3 px-6 text-center">Tổng tiền</th>
                    <th className="py-3 px-6 text-center">Đã thanh toán</th>
                    <th className="py-3 px-6 text-center">Dư nợ</th>
                    <th className="py-3 px-6 text-center">Thao tác</th>
                  </tr>
                </thead>
                {/* {userOrder &&
                        userOrder.map((order, idx) => {
                          return (
                            <TableOrder
                              order={order}
                              idx={idx}
                              loaduserOrder={loaduserOrder}
                            />
                          )
                        })} */}
              </table>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default WareHouseList
