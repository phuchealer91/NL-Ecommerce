import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Col, Form, Row, Spin, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { SearchItem } from '../../../components/LocalSearch'
import { ModalConfirm } from '../../../components/ModalConfirm'
import { AdminSideBar } from '../../../components/navigation/SideBar'
import './Suppliers.scss'
import FormSupplier from './FormSupplier'
import { toast } from 'react-toastify'
import {
  createSuppliers,
  deleteSuppliers,
  getSuppliers,
} from '../../../apis/supplier'

const CreateSupplier = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [suppliers, setSuppliers] = useState([])

  const [supplierToDelete, setSupplierToDelete] = useState('')
  const [keyword, setKeyword] = useState('')
  const totalSupplier = suppliers.length

  useEffect(() => {
    loadSuppliers()
  }, [])
  const loadSuppliers = () =>
    getSuppliers().then((c) => {
      setSuppliers(c.data.suppliers)
    })
  function onFinish({ name }) {
    createSuppliers({ name })
      .then((res) => {
        console.log('hello', res)
        setLoading(false)
        toast.success(`Tạo ${res.data.supplier.name} thành công `)
        loadSuppliers()
      })
      .catch((error) => {
        console.log('hello', error.response.data)
        if (error.response.status === 400) {
          setLoading(false)
          toast.error(error.response.data.error)
        }
      })
    form.resetFields()
  }
  function onHandleDelete(slug) {
    setShowModal(true)
    setSupplierToDelete(slug)
  }

  function onHandleDeleteItem() {
    deleteSuppliers(supplierToDelete)
      .then((res) => {
        setLoading(false)
        toast.success(`${res.data.msg} `)
        loadSuppliers()
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setLoading(false)
          toast.error(err.response.data.error)
        }
      })
    setShowModal(false)
  }
  function closeModal() {
    setShowModal(false)
  }
  // Search
  const searched = (keyword) => (supplier) =>
    supplier.name.toLowerCase().includes(keyword)
  const dataSource =
    suppliers &&
    suppliers.filter(searched(keyword)).map((item) => ({
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
              to={`/admin/supplier/${record.Slug}`}
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
        title="Nhà cung cấp"
        categoryToDelete={supplierToDelete}
      />
      <Row>
        <Col xs={24} sm={24} md={5} lg={5}>
          <AdminSideBar />
        </Col>
        <Col xs={24} sm={24} md={19} lg={19}>
          <div className="category">
            {loading ? (
              <Spin tip="Loading..." />
            ) : (
              <h3> Tạo mới nhà cung cấp</h3>
            )}
            <Form form={form} onFinish={onFinish}>
              <div className="category__form">
                <FormSupplier />
              </div>
            </Form>
            <h3>Tất cả nhà cung cấp ({totalSupplier})</h3>
            {/* Search */}
            <div className="category__search">
              <SearchItem keyword={keyword} setKeyword={setKeyword} />
            </div>
            {
              <Table
                dataSource={dataSource}
                columns={columns}
                rowKey="Id"
                tableLayout="auto"
              />
            }
          </div>
        </Col>
      </Row>
    </React.Fragment>
  )
}

CreateSupplier.propTypes = {}

export default CreateSupplier
