import { Col, Row } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AdminSideBar } from '../../../../components/navigation/SideBar'
import TableReceipts from '../TableReceipts'

InventoryWareHouseList.propTypes = {}

function InventoryWareHouseList(props) {
  const [userReceipts, setUserReceipts] = useState([])
  // useEffect(() => {
  //   loadUserReceipts()
  // }, [])
  // const loadUserReceipts = () => {
  //   getUserReceipts()
  //     .then((res) => {
  //       if (res.data) {
  //         setUserReceipts(res.data.receipts)
  //       }
  //     })
  //     .catch((error) => {
  //       console.log('error', error)
  //     })
  // }
  return (
    <div>
      {' '}
      <Row>
        <Col xs={24} sm={24} md={5} lg={5}>
          <AdminSideBar />
        </Col>
        <Col xs={24} sm={24} md={19} lg={19}>
          <div className="w-full my-6 mx-3">
            <div className="flex items-center justify-between py-4 mx-4">
              <span className="text-gray-600 font-semibold text-lg">
                Quản lý nhập hàng
              </span>
              <Link
                to="/admin/warehouse"
                className="no-underline px-4 py-2 font-semibold bg-blue-600 hover:bg-white hover:text-blue-600 transition rounded border border-blue-600 text-white"
              >
                Nhập hàng
              </Link>
            </div>
            <div className="bg-white shadow-md rounded mx-auto">
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
                {/* {userReceipts &&
                  userReceipts.map((receipt, idx) => {
                    return (
                      <TableReceipts
                        key={receipt._id}
                        receipt={receipt}
                        idx={idx}
                        loadUserReceipts={loadUserReceipts}
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

export default InventoryWareHouseList
