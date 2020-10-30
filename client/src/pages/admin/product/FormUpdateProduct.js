import { TagOutlined } from '@ant-design/icons'
import { Form, Input, Select, Button } from 'antd'
import React from 'react'
const { Option } = Select

const FormUpdateProduct = ({
  onChange,
  onSearch,
  product,
  onChangeCategory,
  categorySubss,
  showSub,
  setProduct,
  arrOfSubs,
  setArrOfSubs,
  categoryss,
}) => {
  const { colors, brands, categories, subs, category } = product
  return (
    <React.Fragment>
      <Form.Item
        rules={[
          {
            required: true,
            message: 'Tên sản phẩm không được để trống',
          },
          { min: 3, message: 'Tên sản phẩm phải có ít nhất 3 ký tự.' },
          { max: 32, message: 'Tên sản phẩm tối đa có 32 ký tự.' },
        ]}
        name="title"
        label="Tên sản phẩm"
      >
        <Input prefix={<TagOutlined />} placeholder="Nhập tên sản phẩm " />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: 'Danh mục không được để trống',
          },
        ]}
        name="description"
        label="Miêu tả"
      >
        <Input
          prefix={<TagOutlined />}
          placeholder="Nhập miêu tả của sản phẩm"
        />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: 'Giá tiền không được để trống',
          },
        ]}
        name="price"
        label="Giá tiền"
      >
        <Input
          type="number"
          prefix={<TagOutlined />}
          placeholder="Nhập giá tiền của sản phẩm"
        />
      </Form.Item>
      <Form.Item label="Shipping" name="shipping">
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Chọn ship"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="Yes">Yes</Option>
          <Option value="No">No</Option>
        </Select>
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: 'Danh mục không được để trống',
          },
        ]}
        name="quantity"
        label="Số lượng"
      >
        <Input
          type="number"
          prefix={<TagOutlined />}
          placeholder="Nhập số lượng của sản phẩm"
        />
      </Form.Item>
      <Form.Item label="Color" name="color">
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Chọn ship"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {colors &&
            colors.map((c) => (
              <Option value={c} key={c}>
                {c}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item label="Nhãn hàng" name="brand">
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Chọn ship"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {brands &&
            brands.map((b) => (
              <Option value={b} key={b}>
                {b}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item label="Danh mục" name="category">
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Chọn danh mục"
          optionFilterProp="children"
          onChange={onChangeCategory}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {categories &&
            categories.map((ca) => (
              <Option value={ca._id} key={ca._id}>
                {ca.name}
              </Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item label="Danh mục con">
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Chọn danh mục con"
          // defaultValue={['a10', 'c12']}
          value={arrOfSubs}
          onChange={(value) => setArrOfSubs(value)}
        >
          {categorySubss &&
            categorySubss.map((cs) => (
              <Option value={cs._id} key={cs._id}>
                {cs.name}
              </Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" type="primary" className="product__btn">
          Thêm
        </Button>
      </Form.Item>
    </React.Fragment>
  )
}
FormUpdateProduct.propTypes = {}

export default FormUpdateProduct
