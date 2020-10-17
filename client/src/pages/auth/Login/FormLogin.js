import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  GoogleOutlined,
  KeyOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'
import Button from 'antd/lib/button'
import React from 'react'
import './Login.scss'
import { Link } from 'react-router-dom'
import PATHS from '../../../redux/constants/paths'
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
          icon={<MailOutlined />}
          className="login__subEmail"
        >
          Đăng nhập với Email và Password
        </Button>
        <Button
          danger
          type="dashed"
          className="login__subGoogle"
          onClick={loginGoogle}
          icon={<GoogleOutlined />}
        >
          Đăng nhập với Google
        </Button>
      </Form.Item>
      <Form.Item className="login__forgot_password">
        <Button
          icon={<KeyOutlined />}
          type="link"
          danger
          className="login__forgot_password-btn"
        >
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
