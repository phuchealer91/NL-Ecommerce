import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
} from '@ant-design/icons'
import { Form, Input } from 'antd'
import Button from 'antd/lib/button'
import React from 'react'
const FormUpdatePassword = () => {
  return (
    <React.Fragment>
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
        <Button htmlType="submit" type="primary" className="update__password">
          Cập nhật mật khẩu
        </Button>
      </Form.Item>
    </React.Fragment>
  )
}
FormUpdatePassword.propTypes = {}

export default FormUpdatePassword
