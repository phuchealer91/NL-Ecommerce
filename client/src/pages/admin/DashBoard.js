import { Col, Row } from 'antd'
import React from 'react'
import AdminSideBar from '../../components/navigation/SideBar/AdminSideBar'

DashBoard.propTypes = {}

function DashBoard(props) {
  return (
    <React.Fragment>
      <Row>
        <Col span={5}>
          <AdminSideBar />
        </Col>
        <Col span={19}>
          <h3 className="text-green-600 font-semibold text-2xl grid place-items-center h-60">
            {' '}
            Welcome to ADMIN{' '}
          </h3>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default DashBoard
