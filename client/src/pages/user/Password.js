import React from 'react'
import PropTypes from 'prop-types'
import { Col, Form, Row } from 'antd'
import { UserSideBar } from '../../components/navigation/SideBar'
import './Password.scss'
import FormUpdatePassword from './FormUpdatePassword'
import { auth } from '../../firebase'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../redux/actions/ui'
import { toast } from 'react-toastify'
function Password(props) {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const onFinish = async ({ password }) => {
    dispatch(showLoading())
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        dispatch(hideLoading())
        toast.success('Cập nhật mật khẩu thành công !')
      })
      .catch((error) => {
        dispatch(hideLoading())
        toast.error(error.message)
      })
    form.resetFields()
  }
  return (
    <React.Fragment>
      <Row>
        <Col xs={24} sm={24} md={5} lg={5}>
          <UserSideBar />
        </Col>
        <Col xs={24} sm={24} md={10} lg={10}>
          <div className="update-password">
            <h3> Cập Nhật Mật Khẩu</h3>
            <Form form={form} onFinish={onFinish}>
              <FormUpdatePassword />
            </Form>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  )
}
Password.propTypes = {}

export default Password
