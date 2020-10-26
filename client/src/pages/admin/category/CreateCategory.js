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
} from 'antd'

import { AdminSideBar } from '../../../components/navigation/SideBar'
import FormCategory from './FormCategory'
import './Categories.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  createCategory,
  deleteCategories,
} from '../../../redux/actions/category'
import { getCategories } from '../../../redux/actions/category'
import { Link } from 'react-router-dom'

const CreateCategory = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState('')

  const categories = useSelector((state) => state.category.listCategories)
  const totalCategory = categories.length
  useEffect(() => {
    dispatch(getCategories())
  }, [])
  const dataSource =
    categories &&
    categories.map((item) => ({
      Id: item._id,
      Name: item.name,
      Slug: item.slug,
    }))
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
      render: (text, record) => (
        <>
          <Button type="primary">
            <Link to={`/admin/category/${record.Slug}`}>Sửa</Link>
          </Button>
          <Button
            type="primary"
            danger
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
      <Modal
        title="Xác nhận"
        visible={showModal}
        onOk={onHandleDeleteItem}
        onCancel={closeModal}
        okText="Xóa"
        cancelText="Thoát"
      >
        <p>
          Khi bạn xóa một danh mục <span className="color-red">không thể</span>{' '}
          khôi phục nó được !
        </p>
        <p>
          {' '}
          Bạn chắc chắn xóa danh mục <strong>{categoryToDelete}</strong> không ?
        </p>
      </Modal>
      <Row>
        <Col xs={24} sm={24} md={5} lg={5}>
          <AdminSideBar />
        </Col>
        <Col xs={24} sm={24} md={19} lg={19}>
          <div className="create-category">
            <h3> Tạo mới danh mục</h3>
            <Form form={form} onFinish={onFinish}>
              <FormCategory />
            </Form>
            <h3>Tất cả danh mục ({totalCategory})</h3>
            <Table dataSource={dataSource} columns={columns} rowKey="Id" />
          </div>
        </Col>
      </Row>
    </React.Fragment>
  )
}

CreateCategory.propTypes = {}

export default CreateCategory
