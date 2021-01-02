import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Row, Table } from 'antd'
import { AdminSideBar } from '../../../components/navigation/SideBar'
import FormCategory from './FormCategory'
import './Categories.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory, updateCategories } from '../../../redux/actions/category'
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom'

const UpdateCategory = ({ match }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const history = useHistory()
  const { categoryEditing } = useSelector((state) => state.category)

  const { slug } = match.params
  useEffect(() => {
    dispatch(getCategory(slug))
  }, [dispatch])

  function onFinish({ name }) {
    dispatch(updateCategories({ name }))
    history.push('/admin/category')
    form.resetFields()
  }
  useEffect(() => {
    form.setFieldsValue({
      name: (categoryEditing && categoryEditing.name) || '',
    })
  }, [categoryEditing])
  return (
    <React.Fragment>
      <Row>
        <Col xs={24} sm={24} md={5} lg={5}>
          <AdminSideBar />
        </Col>
        <Col xs={24} sm={24} md={19} lg={19}>
          <div className="category">
            <h3> Cập nhật danh mục</h3>
            <Form form={form} onFinish={onFinish}>
              <div className="category__form">
                <FormCategory />
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  )
}

UpdateCategory.propTypes = {}

export default UpdateCategory
