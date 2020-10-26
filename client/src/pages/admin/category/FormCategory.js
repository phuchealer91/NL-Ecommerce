import { UserOutlined } from '@ant-design/icons'
import { Form, Input } from 'antd'
import Button from 'antd/lib/button'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
const FormCategory = () => {
  const { categoryEditing } = useSelector((state) => state.category)
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
        <Input prefix={<UserOutlined />} placeholder="Nhập danh mục của bạn" />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" type="primary" className="creat__category">
          Thêm
        </Button>
      </Form.Item>
    </React.Fragment>
  )
}
FormCategory.propTypes = {}

export default FormCategory
