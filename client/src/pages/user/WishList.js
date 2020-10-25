import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'antd'
import SideBar from '../../components/navigation/SideBar'
function WishList(props) {
  return (
    <React.Fragment>
      <Row>
        <Col span={5}>
          <SideBar />
        </Col>
        <Col span={19}>Wish List</Col>
      </Row>
    </React.Fragment>
  )
}
WishList.propTypes = {}

export default WishList
