import { Col, Form, Row, Select, Space, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FileUpload from '../../../components/FileUpload'
import { AdminSideBar } from '../../../components/navigation/SideBar'
import { getCategories, getCategorySubs } from '../../../redux/actions/category'
import { getProduct, updateProduct } from '../../../redux/actions/product'
import FormUpdateProduct from './FormUpdateProduct'
import './Product.scss'
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
const UpdateProducts = ({ match }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [product, setProduct] = useState(initialState)
  const [arrOfSubs, setArrOfSubs] = useState([])
  const [showSub] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  // const history = useHistory()
  const { productEditing } = useSelector((state) => state.product)
  const { listCategories: categories, categorySubs } = useSelector(
    (state) => state.category
  )
  const { slug } = match.params
  useEffect(() => {
    dispatch(getCategories())
    dispatch(getProduct(slug))
  }, [dispatch])

  useEffect(() => {
    if (productEditing && productEditing.category) {
      dispatch(getCategorySubs(productEditing.category._id))
    }
    form.setFieldsValue({
      title: (productEditing && productEditing.title) || '',
      description: (productEditing && productEditing.description) || '',
      price: (productEditing && productEditing.price) || '',
      shipping: (productEditing && productEditing.shipping) || '',
      quantity: (productEditing && productEditing.quantity) || '',
      color: (productEditing && productEditing.color) || '',
      brand: (productEditing && productEditing.brand) || '',
      category: (productEditing && productEditing.category?.name) || '',
    })
    setProduct({
      ...product,
      categories: categories,
      ...productEditing,
    })
    let arr = []
    productEditing &&
      productEditing.subs.map((s) => {
        arr.push(s._id)
      })
    setArrOfSubs((prev) => arr)
  }, [productEditing])
  function onFinish(value) {
    const values = { ...product, subs: arrOfSubs, ...value }
    dispatch(updateProduct(values))
    // window.location.reload()
    // history.push('/admin/sub-category')
    form.resetFields()
  }
  // // Sub category Select
  function onChange(value) {}
  function onChangeCategory(value) {
    // setCategory(value)
    setProduct({ ...product, subs: [] })
    dispatch(getCategorySubs(value))
    if (product.category._id === value) {
      dispatch(getProduct(slug))
    }
    setArrOfSubs([])
  }

  return (
    <React.Fragment>
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
              <h3> Cập nhật sản phẩm</h3>
            )}
            <Form {...layout} form={form} onFinish={onFinish}>
              <div className="product__form">
                <FileUpload
                  setIsLoading={setIsLoading}
                  product={product}
                  setProduct={setProduct}
                />
                <FormUpdateProduct
                  product={product}
                  onChange={onChange}
                  onChangeCategory={onChangeCategory}
                  categorySubss={categorySubs}
                  showSub={showSub}
                  setProduct={setProduct}
                  arrOfSubs={arrOfSubs}
                  setArrOfSubs={setArrOfSubs}
                />
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  )
}

UpdateProducts.propTypes = {}

export default UpdateProducts
