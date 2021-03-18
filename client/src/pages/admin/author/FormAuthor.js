import { TagOutlined } from '@ant-design/icons'
import { Form, Input } from 'antd'
import Button from 'antd/lib/button'
import React from 'react'
const FormAuthor = () => {
  return (
    <React.Fragment>
      <Form.Item
        rules={[
          {
            required: true,
            message: 'Tác giả không được để trống',
          },
          { min: 3, message: 'Tác giả phải có ít nhất 3 ký tự.' },
          { max: 32, message: 'Tác giả tối đa có 32 ký tự.' },
        ]}
        name="name"
      >
        <Input prefix={<TagOutlined />} placeholder="Nhập tên tác giả" />
      </Form.Item>
    </React.Fragment>
  )
}
FormAuthor.propTypes = {}

export default FormAuthor
