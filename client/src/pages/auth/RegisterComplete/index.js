import { Col, Form, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { auth } from '../../../firebase'
import { EMAIL_FOR_REGISTER } from '../../../redux/constants/keys'
import PATHS from '../../../redux/constants/paths'
import FormRegisterComplete from './FormRegisterComplete'
import './RegisterComplete.scss'
const RegisterComplete = (props) => {
  const [form] = Form.useForm()
  const [email, setEmail] = useState('')
  const history = useHistory()
  useEffect(() => {
    setEmail(window.localStorage.getItem(EMAIL_FOR_REGISTER))
  }, [])
  const onFinish = async ({ name, password }) => {
    if (!email) {
      toast.error('Email không được để trống')
    }
    try {
      const result = await auth.signInWithEmailLink(email, window.location.href)
      // remove email localStorage
      if (result.user.emailVerified) {
        window.localStorage.removeItem(EMAIL_FOR_REGISTER)
      }
      // get id user
      let user = auth.currentUser
      await user.updateProfile({ displayName: name })
      await user.updatePassword(password)
      const idTokenUser = await user.getIdTokenResult()
      // save email & token with redux store

      toast.success('Đăng ký thành công !')
      // redirect

      history.push(`${PATHS.HOME}`)
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className="register-complete">
      <Row className="register-complete__wrap">
        <Col xs={24} sm={24} md={8} lg={8}>
          <h3> Cập nhật mật khẩu để hoàn thành quá trình đăng ký</h3>
          <Form form={form} onFinish={onFinish}>
            <FormRegisterComplete email={email} />
          </Form>
        </Col>
      </Row>
    </div>
  )
}

RegisterComplete.propTypes = {}

export default RegisterComplete
