import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  MailOutlined,
  SmileTwoTone,
  UserOutlined,
} from '@ant-design/icons'
import { Form, Input } from 'antd'
import Button from 'antd/lib/button'
import PropTypes from 'prop-types'
import React from 'react'
import './RegisterComplete.scss'

const FormRegisterComplete = ({ email }) => {
  return (
    <>
      <Form.Item
        rules={[
          {
            required: true,
            message: 'Tên không được để trống',
          },
        ]}
        name="name"
      >
        <Input placeholder="Nhập tên của bạn" prefix={<SmileTwoTone />} />
      </Form.Item>
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
      >
        <Input
          placeholder="Nhập địa chỉ email"
          prefix={<MailOutlined />}
          disabled
          value={email}
        />
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
          type="primary"
          style={{ background: '#003a8c' }}
          htmlType="submit"
          className="form-submit-button"
        >
          Đăng ký ngay
        </Button>
      </Form.Item>
    </>
  )
}
FormRegisterComplete.propTypes = {
  email: PropTypes.string,
}

export default FormRegisterComplete
