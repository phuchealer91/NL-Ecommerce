import { Button, Col, Form, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAuthor, updateAuthors } from '../../../apis/author'
import { AdminSideBar } from '../../../components/navigation/SideBar'
import './Authors.scss'
import FormAuthor from './FormAuthor'

const UpdateAuthor = ({ match }) => {
  const [form] = Form.useForm()
  const history = useHistory()
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [loading, setLoading] = useState(false)

  const { slug } = match.params
  useEffect(() => {
    loadAuthor()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const loadAuthor = () =>
    getAuthor(slug).then((au) => {
      setName(au.data.author.name)
      setBio(au.data.author.bio)
    })
  function onFinish({ name }) {
    updateAuthors(slug, { name, bio })
      .then((res) => {
        setLoading(false)
        setName('')
        setBio('')
        toast.success(`Cập nhật '${res.data.author.name}' thành công `)
        history.push('/admin/author')
      })
      .catch((error) => {
        setLoading(false)
        console.log(error.response.data)
        if (error.response.status === 400)
          toast.error(error.response.data.error)
      })
  }
  function onHandleChange(value) {
    setBio(value)
  }

  return (
    <React.Fragment>
      <Row>
        <Col xs={24} sm={24} md={5} lg={5}>
          <AdminSideBar />
        </Col>
        <Col xs={24} sm={24} md={19} lg={19}>
          <div className="category">
            <h3> Cập nhật tác giả</h3>
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
              <FormAuthor />
              <ReactQuill
                value={bio}
                onChange={onHandleChange}
                placeholder="Điền thông tin của tác giả"
              />
              <Button htmlType="submit" type="primary" className="mt-3">
                Thêm
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  )
}

UpdateAuthor.propTypes = {}

export default UpdateAuthor
