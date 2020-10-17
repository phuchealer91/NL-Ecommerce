import { MailOutlined } from '@ant-design/icons'
import { Col, Input, Row, Form } from 'antd'
import React from 'react'
import FormLogin from './FormLogin'
import './Login.scss'
import { auth, googleAuthProvider } from '../../../firebase'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { loginInUser } from '../../../redux/actions/users'
import { toast } from 'react-toastify'
import PATHS from '../../../redux/constants/paths'
import { useAuthUser } from '../../../hooks/useAuthUser'
// import useLoginUser from '../../../hooks/useLoginUser'
const Login = (props) => {
  useAuthUser()
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const history = useHistory()
  const onFinish = async ({ email, password }) => {
    try {
      const result = await auth.signInWithEmailAndPassword(email, password)
      const { user } = result
      const idTokenUser = await user.getIdTokenResult()
      const data = { email: user.email, token: idTokenUser.token }
      dispatch(loginInUser(data))
      toast.success('Đăng nhập thành công !')
      history.push(`${PATHS.HOME}`)
      // useLoginUser(result, 'Đăng nhập thành công', PATHS.HOME)
    } catch (error) {
      toast.error(error.message)
    }
  }
  const loginGoogle = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result
        const idTokenUser = await user.getIdTokenResult()
        const data = {
          displayName: user.displayName,
          email: user.email,
          token: idTokenUser.token,
        }
        dispatch(loginInUser(data))
        toast.success('Đăng nhập thành công !')
        history.push(`${PATHS.HOME}`)
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }
  return (
    <div className="login">
      <Row className="login__wrap">
        <Col xs={24} sm={24} md={8} lg={8}>
          <h3> Đăng Nhập</h3>
          <Form form={form} onFinish={onFinish}>
            <FormLogin loginGoogle={loginGoogle} />
          </Form>
        </Col>
      </Row>
    </div>
  )
}

Login.propTypes = {}

export default Login
