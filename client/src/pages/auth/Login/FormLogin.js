import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  GoogleOutlined,
  KeyOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Form, Input } from 'antd'
import Button from 'antd/lib/button'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import PATHS from '../../../redux/constants/paths'
import './Login.scss'
const FormLogin = ({ loginGoogle }) => {
  return (
    <>
      <Form.Item
        rules={[
          {
            type: 'email',
            message: 'Email không đúng định dạng',
          },
          {
            required: true,
            message: 'Email không được để trống',
          },
        ]}
        name="email"
      >
        <Input placeholder="Nhập địa chỉ email" prefix={<MailOutlined />} />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: 'Mật khẩu không được để trống',
          },
          { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự.' },
        ]}
        name="password"
      >
        <Input.Password
          prefix={<UserOutlined />}
          placeholder="Nhập mật khẩu của bạn"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </Form.Item>

      <Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          className="login__subEmail flex items-center justify-center"
        >
          <MailOutlined /> <span>Đăng nhập với Email và Password</span>
        </Button>
        <Button
          danger
          type="dashed"
          className="login__subGoogle flex items-center justify-center"
          onClick={loginGoogle}
        >
          <GoogleOutlined /> <span>Đăng nhập với Google</span>
        </Button>
      </Form.Item>
      <Form.Item className="login__forgot_password">
        <Button
          type="link"
          danger
          className="login__forgot_password-btn flex items-center justify-center "
        >
          <KeyOutlined />
          <Link
            to={`/${PATHS.FORGOT}/${PATHS.PASSWORD}`}
            className="login__forgot_password-link"
          >
            Forgot Password
          </Link>
        </Button>
      </Form.Item>
    </>
  )
}
FormLogin.propTypes = {
  loginGoogle: PropTypes.func,
}

export default FormLogin
