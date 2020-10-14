import { MailOutlined } from '@ant-design/icons'
import { Col, Input, Row } from 'antd'
import React from 'react'
import './Login.scss'
const Login = (props) => {
  return (
    <Row className="">
      <Col xs={24} sm={24} md={12} lg={12}>
        <Input placeholder="default size" prefix={<MailOutlined />} />
      </Col>
    </Row>
  )
}

Login.propTypes = {}

export default Login
