import { TagOutlined } from '@ant-design/icons'
import { Form, Input } from 'antd'
import Button from 'antd/lib/button'
import React from 'react'
const FormSupplier = () => {
  return (
    <React.Fragment>
      <Form.Item
        rules={[
          {
            required: true,
            message: 'Nhà cung cấp không được để trống',
          },
          { min: 3, message: 'Nhà cung cấp phải có ít nhất 3 ký tự.' },
          { max: 32, message: 'Nhà cung cấp tối đa có 32 ký tự.' },
        ]}
        name="name"
      >
        <Input prefix={<TagOutlined />} placeholder="Nhập tên nhà cung cấp" />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" type="primary" className="category__btn">
          Thêm
        </Button>
      </Form.Item>
    </React.Fragment>
  )
}
FormSupplier.propTypes = {}

export default FormSupplier
