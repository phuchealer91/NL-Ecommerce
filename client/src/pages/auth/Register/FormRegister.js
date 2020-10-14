import { MailOutlined } from '@ant-design/icons'
import { Form, Input } from 'antd'
import Button from 'antd/lib/button'
import React from 'react'
import './Register.scss'
const FormRegister = (props) => {
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

      <Form.Item>
        <Button type="primary" htmlType="submit" className="form-submit-button">
          Đăng ký
        </Button>
      </Form.Item>
    </>
  )
}

export default FormRegister
