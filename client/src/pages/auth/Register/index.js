import { Col, Form, Row } from 'antd'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import { auth } from '../../../firebase'
import { useAuthUser } from '../../../hooks/useAuthUser'
import { EMAIL_FOR_REGISTER } from '../../../redux/constants/keys'
import FormRegister from './FormRegister'
import './Register.scss'
const Register = (props) => {
  // useAuthUser()
  const [form] = Form.useForm()
  const { user } = useSelector((state) => ({ ...state }))
  const history = useHistory()
  useEffect(() => {
    if (user && user.token) history.push('/')
  }, [user, history])
  const onFinish = async ({ email }) => {
    // Config dùng trong TH ấn vào link sẽ redirect về url trong config
    const config = {
      // env trong React phải có prefix là: REACT_APP_
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    }
    await auth.sendSignInLinkToEmail(email, config)
    toast.success(
      `Đã gửi xác nhận đến địa chỉ ${email}. Vui lòng click vào link xác nhận để hoàn thành đăng ký`
    )
    window.localStorage.setItem(EMAIL_FOR_REGISTER, email)
    form.resetFields()
  }
  return (
    <div className="register">
      <Row className="register__wrap">
        <Col xs={24} sm={24} md={8} lg={8}>
          <h3> Đăng ký</h3>
          <Form form={form} onFinish={onFinish}>
            <FormRegister />
          </Form>
        </Col>
      </Row>
    </div>
  )
}

Register.propTypes = {}

export default Register
