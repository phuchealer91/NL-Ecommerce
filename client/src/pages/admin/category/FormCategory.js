import { TagOutlined } from '@ant-design/icons'
import { Form, Input } from 'antd'
import Button from 'antd/lib/button'
import React from 'react'
const FormCategory = () => {
  return (
    <React.Fragment>
      <Form.Item
        rules={[
          {
            required: true,
            message: 'Danh mục không được để trống',
          },
          { min: 3, message: 'Danh mục phải có ít nhất 3 ký tự.' },
          { max: 32, message: 'Danh mục tối đa có 32 ký tự.' },
        ]}
        name="name"
      >
        <Input prefix={<TagOutlined />} placeholder="Nhập danh mục của bạn" />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" type="primary" className="category__btn">
          Thêm
        </Button>
      </Form.Item>
    </React.Fragment>
  )
}
FormCategory.propTypes = {}

export default FormCategory
