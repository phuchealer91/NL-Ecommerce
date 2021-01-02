import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Form, Row, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import imageDefault from '../../../assets/images/default-image.jpg'
import { SearchItem } from '../../../components/LocalSearch'
import { ModalConfirm } from '../../../components/ModalConfirm'
import { AdminSideBar } from '../../../components/navigation/SideBar'
import {
  deleteProduct,
  getListAllProduct,
} from '../../../redux/actions/product'
import './Product.scss'
const ListProduct = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const [productToDelete, setProductToDelete] = useState('')
  const [keyword, setKeyword] = useState('')

  const { listAllProducts } = useSelector((state) => state.product)
  const totalProducts = listAllProducts.length
  useEffect(() => {
    dispatch(getListAllProduct())
  }, [dispatch])

  function onHandleDelete(slug) {
    setShowModal(true)
    setProductToDelete(slug)
  }
  function onHandleDeleteItem() {
    dispatch(deleteProduct(productToDelete))
    setShowModal(false)
  }
  function closeModal() {
    setShowModal(false)
  }
  // Search
  const searched = (keyword) => (category) =>
    category.title.toLowerCase().includes(keyword)
  const dataSource =
    listAllProducts &&
    listAllProducts?.filter(searched(keyword)).map((item) => ({
      Id: item._id,
      Title: item.title,
      Slug: item.slug,
      Price: item.price,
      Brand: item.brand,
      Image: item.images[0] ? item.images[0].url : imageDefault,
    }))
  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'Title',
      key: 'title',
    },
    {
      title: 'Slug',
      dataIndex: 'Slug',
      key: 'slug',
    },
    {
      title: 'Price',
      dataIndex: 'Price',
      key: 'price',
    },
    {
      title: 'Image',
      dataIndex: 'Image',
      key: 'image',
      render: (image) => <Avatar size={64} src={image} />,
    },
    {
      title: 'Brand',
      dataIndex: 'Brand',
      key: 'brand',
    },
    {
      title: 'Thao tác',
      dataIndex: '',
      key: 'x',
      width: '200px',
      render: (text, record) => (
        <>
          <Button type="primary" className="mr">
            <Link to={`/admin/product/${record.Slug}`} className="sub__edit">
              <span className="product__icon">
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
        title="sản phẩm"
        categoryToDelete={productToDelete}
      />
      <Row>
        <Col xs={24} sm={24} md={5} lg={5}>
          <AdminSideBar />
        </Col>
        <Col xs={24} sm={24} md={19} lg={19}>
          <div className="product">
            <h3>Tất cả sản phẩm ({totalProducts})</h3>
            {/* Search */}
            <div className="product__search">
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

ListProduct.propTypes = {}

export default ListProduct
