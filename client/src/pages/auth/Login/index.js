import { Col, Form, Row } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { auth, googleAuthProvider } from '../../../firebase'
import { useCheckAdmin } from '../../../hooks/useCheckAdmin'
import { registerOrUpdateUser } from '../../../redux/actions/users'
import FormLogin from './FormLogin'
import './Login.scss'
// import useLoginUser from '../../../hooks/useLoginUser'
const Login = (props) => {
  useCheckAdmin()
  // useAuthUser()
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const onFinish = async ({ email, password }) => {
    try {
      const result = await auth.signInWithEmailAndPassword(email, password)
      const { user } = result
      const idTokenUser = await user.getIdTokenResult()
      const data = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        token: idTokenUser.token,
      }
      dispatch(registerOrUpdateUser(data))
      // dispatch(loginInUser(data))
      toast.success('Đăng nhập thành công !')
      // history.push(`${PATHS.HOME}`)
      // useLoginUser(result, 'Đăng nhập thành công', PATHS.HOME)
      // CheckAdmin()
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
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          token: idTokenUser.token,
        }
        dispatch(registerOrUpdateUser(data))

        toast.success('Đăng nhập thành công !')
        // history.push(`${PATHS.HOME}`)
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }
  return (
    <div className="login">
      <Row className="login__wrap">
        <Col xs={24} sm={24} md={8} lg={8}>
          <h3 className="pb-2 text-green-600 font-semibold text-xl">
            {' '}
            Đăng Nhập
          </h3>
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
