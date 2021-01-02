import { Col, Row } from 'antd'
import React from 'react'
function Footer() {
  return (
    <React.Fragment>
      <div className="border-t-2 border-green-500 mx-5 py-6">
        <Row>
          <Col xs={6} sm={6} md={6} lg={6}>
            <ul className="py-3">
              <h3 className="pb-3 font-semibold text-gray-800">
                Hỗ trợ khách hàng
              </h3>
              <li>
                <a href="">Thẻ ưu đãi</a>
              </li>
              <li>
                <a href="">Trung tâm bảo hành</a>
              </li>
              <li>
                <a href="">Thanh toán và giao hàng</a>
              </li>
            </ul>
          </Col>
          <Col xs={6} sm={6} md={6} lg={6}>
            <ul className="py-3">
              <h3 className="pb-3 font-semibold text-gray-800">
                Chính sách mua hàng và bảo hành
              </h3>
              <li>
                <a href="">Thẻ ưu đãi</a>
              </li>
              <li>
                <a href="">Trung tâm bảo hành</a>
              </li>
              <li>
                <a href="">Thanh toán và giao hàng</a>
              </li>
            </ul>
          </Col>
          <Col xs={6} sm={6} md={6} lg={6}>
            <ul className="py-3">
              <h3 className="pb-3 font-semibold text-gray-800">Thông tin MT</h3>
              <li>
                <a href="">Thẻ ưu đãi</a>
              </li>
              <li>
                <a href="">Trung tâm bảo hành</a>
              </li>
              <li>
                <a href="">Thanh toán và giao hàng</a>
              </li>
            </ul>
          </Col>
          <Col xs={6} sm={6} md={6} lg={6}>
            <ul className="py-3">
              <h3 className="pb-3 font-semibold text-gray-800">Liên hệ</h3>
              <li>
                <a href="">Thẻ ưu đãi</a>
              </li>
              <li>
                <a href="">Trung tâm bảo hành</a>
              </li>
              <li>
                <a href="">Thanh toán và giao hàng</a>
              </li>
            </ul>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  )
}

export default Footer
