import { LoadingOutlined } from '@ant-design/icons'
import { Col, Form, Row, Space, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import FileUpload from '../../../components/FileUpload'
import { AdminSideBar } from '../../../components/navigation/SideBar'
import { getCategories, getCategorySubs } from '../../../redux/actions/category'
import { createProduct } from '../../../redux/actions/product'
import FormCreateProduct from './FormCreateProduct'
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}
const initialState = {
  title: '',
  description: '',
  price: '',
  categories: [],
  category: '',
  subs: [],
  shipping: ['Yes', 'No'],
  quantity: '',
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
  color: '',
  brand: '',
}
const CreateProducts = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const history = useHistory()
  const [product, setProduct] = useState(initialState)
  const [categorySubss, setCategorySubss] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSub, setShowSub] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const { listCategories: categories, categorySubs } = useSelector(
    (state) => state.category
  )
  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])
  useEffect(() => {
    // form.setFieldsValue({
    //   name: (subCategoryEditing && subCategoryEditing.name) || '',
    // })
    setProduct({ ...product, categories: categories })
  }, [categories])
  function onFinish(value) {
    const values = { ...product, ...value }
    setProduct(values)
    dispatch(createProduct(values))
    setShowSub(false)
    form.resetFields()
    window.location.reload()
  }
  function onChange(value) {
    // console.log(`selected ${value}`)
  }
  function onChangeCategory(_id) {
    setProduct({ ...product, subs: [] })
    dispatch(getCategorySubs(_id))
    setShowSub(true)
  }
  return (
    <React.Fragment>
      {/* <ModalConfirm
        showModal={showModal}
        closeModal={closeModal}
        onHandleDeleteItem={onHandleDeleteItem}
        title="danh mục"
        categoryToDelete={categoryToDelete}
      /> */}
      <Row>
        <Col xs={24} sm={24} md={5} lg={5}>
          <AdminSideBar />
        </Col>
        <Col xs={24} sm={24} md={19} lg={19}>
          <div className="product">
            {isLoading ? (
              <Space size="middle">
                <Spin size="large" />
              </Space>
            ) : (
              <h3> Tạo mới sản phẩm</h3>
            )}

            <Form {...layout} form={form} onFinish={onFinish}>
              <div className="product__form">
                <FileUpload
                  setIsLoading={setIsLoading}
                  product={product}
                  setProduct={setProduct}
                />
                <FormCreateProduct
                  product={product}
                  onChange={onChange}
                  onChangeCategory={onChangeCategory}
                  categorySubss={categorySubs}
                  showSub={showSub}
                  setProduct={setProduct}
                />
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  )
}

CreateProducts.propTypes = {}

export default CreateProducts
