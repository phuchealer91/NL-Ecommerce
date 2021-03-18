import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Col, Form, Row, Spin, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { SearchItem } from '../../../components/LocalSearch'
import { ModalConfirm } from '../../../components/ModalConfirm'
import { AdminSideBar } from '../../../components/navigation/SideBar'
// import {
//   createAuthor,
//   deleteAuthors,
//   getAuthors,
// } from '../../../redux/actions/category'
import './Authors.scss'
import FormAuthor from './FormAuthor'
import { toast } from 'react-toastify'
import { createAuthors, deleteAuthors, getAuthors } from '../../../apis/author'
import ReactQuill from 'react-quill'

const CreateAuthor = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [authors, setAuthors] = useState([])
  const [authorToDelete, setAuthorToDelete] = useState('')
  const [bio, setBio] = useState('')
  const [keyword, setKeyword] = useState('')

  // const categories = useSelector((state) => state.category.listCategories)
  const totalAuthor = authors.length

  useEffect(() => {
    loadAuthors()
  }, [])
  const loadAuthors = () =>
    getAuthors().then((c) => {
      setAuthors(c.data.authors)
    })
  function onFinish({ name }) {
    createAuthors({ name, bio })
      .then((res) => {
        setLoading(false)
        setBio('')
        toast.success(`Tạo ${res.data.author.name} thành công `)
        loadAuthors()
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setLoading(false)
          toast.error(error.response.data.error)
        }
      })
    form.resetFields()
  }
  function onHandleDelete(slug) {
    setShowModal(true)
    setAuthorToDelete(slug)
  }

  function onHandleDeleteItem() {
    deleteAuthors(authorToDelete)
      .then((res) => {
        setLoading(false)
        toast.success(`${res.data.msg} `)
        loadAuthors()
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
  function onHandleChange(value) {
    setBio(value)
  }
  // Search
  const searched = (keyword) => (author) =>
    author.name.toLowerCase().includes(keyword)
  const dataSource =
    authors &&
    authors.filter(searched(keyword)).map((item) => ({
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
              to={`/admin/author/${record.Slug}`}
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
        title="tác giả"
        categoryToDelete={authorToDelete}
      />
      <Row>
        <Col xs={24} sm={24} md={5} lg={5}>
          <AdminSideBar />
        </Col>
        <Col xs={24} sm={24} md={19} lg={19}>
          <div className="category">
            {loading ? <Spin tip="Loading..." /> : <h3> Tạo mới tác giả</h3>}
            <Form form={form} onFinish={onFinish}>
              <FormAuthor />
              <label htmlFor="">Thông tin của tác giả</label>
              <ReactQuill
                value={bio}
                onChange={onHandleChange}
                placeholder="Điền thông tin của tác giả"
              />
              <Button htmlType="submit" type="primary" className="mt-3">
                Thêm
              </Button>
            </Form>
            <h3>Tất cả tác giả ({totalAuthor})</h3>
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

CreateAuthor.propTypes = {}

export default CreateAuthor
