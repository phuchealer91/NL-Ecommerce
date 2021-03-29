import { Col, Form, Row, Space, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getAuthors } from '../../../apis/author'
import { getCategories, getCategorySubs } from '../../../apis/category'
import { createProducts } from '../../../apis/product'
import { getSuppliers } from '../../../apis/supplier'
import FileUpload from '../../../components/FileUpload'
import { AdminSideBar } from '../../../components/navigation/SideBar'
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
  shipping: ['Có', 'Không'],
  quantity: '',
  pages: '',
  author: [],
  supplier: '',
  publisher: '',
  publication: null,

  images: [],
  layouts: ['Bìa Cứng', 'Bìa Mềm'],
  languages: ['Tiếng Việt', 'Tiếng Anh'],
  layout: '',
  lang: '',
}
const CreateProducts = () => {
  const [form] = Form.useForm()
  const [product, setProduct] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const [categorySubs, setCategorySubs] = useState([])
  const [authors, setAuthors] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [showSub, setShowSub] = useState(false)

  useEffect(() => {
    loadCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    loadAuthors()
  }, [])
  useEffect(() => {
    loadSuppliers()
  }, [])

  const loadCategories = () =>
    getCategories().then((c) =>
      setProduct({ ...product, categories: c.data.categories })
    )
  const loadAuthors = () => getAuthors().then((c) => setAuthors(c.data.authors))
  const loadSuppliers = () =>
    getSuppliers().then((c) => setSuppliers(c.data.suppliers))

  function onFinish(value) {
    const values = {
      ...product,
      ...value,
      publication: value['publication']
        ? value['publication'].format('DD-MM-YYYY')
        : null,
    }
    // console.log('ANH EYU EMMMMMMMMM', values)
    createProducts(values)
      .then((res) => {
        toast.success(`Tạo ${res.data.product.title} thành công `)
        window.location.reload()
      })
      .catch((err) => {
        if (err.response.status === 400) toast.error(err.response.data.error)
      })
  }
  function onChange(value) {}
  function onChangeCategory(_id) {
    setProduct({ ...product, subs: [] })
    getCategorySubs(_id).then((res) => {
      console.log('SUB OPTIONS ON CATGORY CLICK', res)
      setCategorySubs(res.data.subs)
    })
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
                  authors={authors}
                  suppliers={suppliers}
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
