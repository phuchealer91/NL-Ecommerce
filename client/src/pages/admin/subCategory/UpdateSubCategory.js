import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Row, Select, Table } from 'antd'
import { AdminSideBar } from '../../../components/navigation/SideBar'
import FormCategory from './FormSubCategory'
import './SubCategories.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  getSubCategory,
  updateSubCategories,
} from '../../../redux/actions/subCategory'
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom'
import { getCategories } from '../../../redux/actions/category'
const { Option } = Select
const UpdateSubCategory = ({ match }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [subcategory, setSubcategory] = useState('')
  const history = useHistory()
  const { category } = useSelector((state) => ({ ...state }))
  const { subCategoryEditing } = useSelector((state) => state.subCategory)

  const { slug } = match.params
  useEffect(() => {
    dispatch(getCategories())
    dispatch(getSubCategory(slug))
  }, [dispatch, slug])

  useEffect(() => {
    form.setFieldsValue({
      name: (subCategoryEditing && subCategoryEditing.name) || '',
    })
    setSubcategory((subCategoryEditing && subCategoryEditing.parent) || '')
  }, [subCategoryEditing])
  function onFinish({ name }) {
    const values = { name, parent: subcategory }
    dispatch(updateSubCategories(values))
    history.push('/admin/sub-category')
    form.resetFields()
  }
  // Sub category Select
  function onChange(value) {
    setSubcategory(value)
  }

  function onBlur() {
    console.log('blur')
  }

  function onFocus() {
    console.log('focus')
  }

  function onSearch(val) {
    console.log('search:', val)
  }

  return (
    <React.Fragment>
      <Row>
        <Col xs={24} sm={24} md={5} lg={5}>
          <AdminSideBar />
        </Col>
        <Col xs={24} sm={24} md={19} lg={19}>
          <div className="sub">
            <h3> Cập nhật danh mục con</h3>
            <Form form={form} onFinish={onFinish}>
              <div className="sub__form">
                <div className="sub__select">
                  Chọn danh mục chính:{' '}
                  <Select
                    showSearch
                    style={{ width: 400 }}
                    placeholder="Chọn danh mục"
                    optionFilterProp="children"
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    value={subcategory}
                  >
                    {category.listCategories.length > 0 &&
                      category.listCategories.map((category) => (
                        <Option key={category._id} value={category._id}>
                          {category.name}
                        </Option>
                      ))}
                  </Select>
                </div>

                <FormCategory />
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  )
}

UpdateSubCategory.propTypes = {}

export default UpdateSubCategory
