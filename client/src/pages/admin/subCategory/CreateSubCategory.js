import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Col,
  Form,
  Row,
  Table,
  Modal,
  message,
  Statistic,
  Divider,
  Input,
  Select,
} from 'antd'

import { AdminSideBar } from '../../../components/navigation/SideBar'
import FormCategory from './FormSubCategory'
import './SubCategories.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  createSubCategory,
  deleteSubCategories,
  getSubCategories,
} from '../../../redux/actions/subCategory'
import { getCategories } from '../../../redux/actions/category'
import { Link } from 'react-router-dom'
import { SearchItem } from '../../../components/LocalSearch'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { ModalConfirm } from '../../../components/ModalConfirm'
const { Option } = Select

const CreateSubCategory = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState('')
  const [subcategory, setSubcategory] = useState('')
  const [keyword, setKeyword] = useState('')

  const categories = useSelector((state) => state.category.listCategories)
  const subCategories = useSelector(
    (state) => state.subCategory.listSubCategories
  )
  const totalCategory = categories.length
  useEffect(() => {
    dispatch(getSubCategories())
    dispatch(getCategories())
  }, [dispatch])

  function onFinish({ name }) {
    const values = { name, parent: subcategory }
    dispatch(createSubCategory(values))
    form.resetFields()
  }
  function onHandleDelete(slug) {
    setShowModal(true)
    setCategoryToDelete(slug)
  }
  function onHandleDeleteItem() {
    dispatch(deleteSubCategories(categoryToDelete))
    setShowModal(false)
  }
  function closeModal() {
    setShowModal(false)
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
  // Search
  const searched = (keyword) => (category) =>
    category.name.toLowerCase().includes(keyword)
  const dataSource =
    subCategories &&
    subCategories.filter(searched(keyword)).map((item) => ({
      Id: item._id,
      Name: item.name,
      Slug: item.slug,
    }))
  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'name',
    },
    {
      title: 'Slug',
      dataIndex: 'Slug',
      key: 'slug',
    },
    {
      title: 'Thao tác',
      dataIndex: '',
      key: 'x',
      width: '200px',
      render: (text, record) => (
        <>
          <Button type="primary" className="mr">
            <Link
              to={`/admin/sub-category/${record.Slug}`}
              className="sub__edit"
            >
              <span className="sub__icon">
                <EditOutlined />
              </span>
              Sửa
            </Link>
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={(e) => {
              onHandleDelete(record.Slug, e)
            }}
          >
            Xóa
          </Button>
        </>
      ),
    },
  ]
  return (
    <React.Fragment>
      <ModalConfirm
        showModal={showModal}
        closeModal={closeModal}
        onHandleDeleteItem={onHandleDeleteItem}
        title="danh mục"
        categoryToDelete={categoryToDelete}
      />
      <Row>
        <Col xs={24} sm={24} md={5} lg={5}>
          <AdminSideBar />
        </Col>
        <Col xs={24} sm={24} md={19} lg={19}>
          <div className="sub">
            <h3> Tạo mới danh mục con</h3>
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
                  >
                    {categories.length > 0 &&
                      categories.map((category) => (
                        <Option key={category._id} value={category._id}>
                          {category.name}
                        </Option>
                      ))}
                  </Select>
                </div>
                <FormCategory />
              </div>
            </Form>
            <h3>Tất cả danh mục con ({totalCategory})</h3>
            {/* Search */}
            <div className="category__search">
              <SearchItem keyword={keyword} setKeyword={setKeyword} />
            </div>
            <Table
              dataSource={dataSource}
              columns={columns}
              rowKey="Id"
              tableLayout="auto"
            />
          </div>
        </Col>
      </Row>
    </React.Fragment>
  )
}

CreateSubCategory.propTypes = {}

export default CreateSubCategory
