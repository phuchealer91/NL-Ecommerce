import { Col, Form, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getSupplier, updateSuppliers } from '../../../apis/supplier'
import { AdminSideBar } from '../../../components/navigation/SideBar'
import FormSupplier from './FormSupplier'
import './Suppliers.scss'

const UpdateSupplier = ({ match }) => {
  const [form] = Form.useForm()
  const history = useHistory()
  const [name, setName] = useState('')
  // const [loading, setLoading] = useState(false)

  const { slug } = match.params
  useEffect(() => {
    loadSupplier()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const loadSupplier = () =>
    getSupplier(slug).then((au) => setName(au.data.supplier.name))
  function onFinish({ name }) {
    updateSuppliers(slug, { name })
      .then((res) => {
        // setLoading(false)
        setName('')
        toast.success(`Cập nhật '${res.data.supplier.name}' thành công `)
        history.push('/admin/supplier')
      })
      .catch((error) => {
        // setLoading(false)
        console.log(error.response.data)
        if (error.response.status === 400)
          toast.error(error.response.data.error)
      })
  }

  return (
    <React.Fragment>
      <Row>
        <Col xs={24} sm={24} md={5} lg={5}>
          <AdminSideBar />
        </Col>
        <Col xs={24} sm={24} md={19} lg={19}>
          <div className="category">
            <h3> Cập nhật nhà cung cấp</h3>
            <Form
              form={form}
              onFinish={onFinish}
              fields={[
                {
                  name: ['name'],
                  value: name,
                },
              ]}
            >
              <div className="category__form">
                <FormSupplier />
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  )
}

UpdateSupplier.propTypes = {}

export default UpdateSupplier
