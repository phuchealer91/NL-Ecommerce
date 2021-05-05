import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Col, Form, Row, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { SearchItem } from '../../../components/LocalSearch'
import { ModalConfirm } from '../../../components/ModalConfirm'
import { Layouts } from '../../../components/navigation/Layouts/Layouts'
import { AdminSideBar } from '../../../components/navigation/SideBar'
import SectionTitle from '../../../components/SectionTitle/SectionTitle'
import {
  createCategory,
  deleteCategories,
  getCategories,
} from '../../../redux/actions/category'
import './Categories.scss'
import FormCategory from './FormCategory'

const CreateCategory = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState('')
  const [keyword, setKeyword] = useState('')

  const categories = useSelector((state) => state.category.listCategories)
  const totalCategory = categories.length
  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  function onFinish({ name }) {
    dispatch(createCategory({ name }))
    form.resetFields()
  }
  function onHandleDelete(slug) {
    setShowModal(true)
    setCategoryToDelete(slug)
  }
  function onHandleDeleteItem() {
    dispatch(deleteCategories(categoryToDelete))
    setShowModal(false)
  }
  function closeModal() {
    setShowModal(false)
  }
  // Search
  const searched = (keyword) => (category) =>
    category.name.toLowerCase().includes(keyword)
  const dataSource =
    categories &&
    categories.filter(searched(keyword)).map((item) => ({
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
              to={`/admin/category/${record.Slug}`}
              className="category__edit"
            >
              <span className="category__icon">
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
      <Layouts>
        <SectionTitle>Loại sản phẩm</SectionTitle>
        <div className="px-4 py-3 mt-4 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h3 className="text-sm text-gray-600 pb-1"> Tạo mới danh mục</h3>
          <Form form={form} onFinish={onFinish}>
            <div className="category__form">
              <FormCategory />
            </div>
          </Form>
          <h3>Tất cả danh mục ({totalCategory})</h3>
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
      </Layouts>
    </React.Fragment>
  )
}

CreateCategory.propTypes = {}

export default CreateCategory
