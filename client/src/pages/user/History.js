import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'antd'
import { UserSideBar } from '../../components/navigation/SideBar'
function History(props) {
  return (
    <React.Fragment>
      <Row>
        <Col span={5}>
          <UserSideBar />
        </Col>
        <Col span={19}>history</Col>
      </Row>
    </React.Fragment>
  )
}
History.propTypes = {}

export default History
