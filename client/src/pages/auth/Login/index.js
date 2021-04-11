import { Col, Form, Row } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import { registerOrUpdateUsers } from '../../../apis/auth'
import { auth, googleAuthProvider } from '../../../firebase'
import { useCheckAdmin } from '../../../hooks/useCheckAdmin'
import { loginInUser, registerOrUpdateUser } from '../../../redux/actions/users'
import FormLogin from './FormLogin'
import './Login.scss'
// import useLoginUser from '../../../hooks/useLoginUser'
const Login = (props) => {
  // useCheckAdmin()
  // useAuthUser()
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const history = useHistory()
  const { user } = useSelector((state) => ({ ...state }))
  useEffect(() => {
    let intended = history.location.state
    if (intended) {
      return
    } else {
      if (user && user.token) history.push('/')
    }
  }, [user, history])

  const roleBasedRedirect = (res) => {
    // check if intended
    let intended = history.location.state
    if (intended) {
      history.push(intended.from)
    } else {
      if (res.data.role === 'admin') {
        history.push('/admin/dashboard')
      } else {
        history.push('/user/history')
      }
    }
  }

  const onFinish = async ({ email, password }) => {
    try {
      const result = await auth.signInWithEmailAndPassword(email, password)
      const { user } = result
      const idTokenUser = await user.getIdTokenResult()
      window.localStorage.setItem('token', idTokenUser.token)
      registerOrUpdateUsers(idTokenUser.token).then((res) => {
        if (res.data) {
          const data = {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            token: idTokenUser.token,
            userDatas: res.data,
            notificationsCount: res.data.notifications.newNotifications,
            role: res.data.role,
            _id: res.data._id,
          }
          dispatch(loginInUser(data))
          roleBasedRedirect(res)
        }
      })
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
        window.localStorage.setItem('token', idTokenUser.token)

        registerOrUpdateUsers(idTokenUser.token).then((res) => {
          if (res.data) {
            const data = {
              name: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              token: idTokenUser.token,
              userDatas: res.data,
              notificationsCount: res.data.notifications.newNotifications,
              role: res.data.role,
              _id: res.data._id,
            }
            dispatch(loginInUser(data))
          }
          roleBasedRedirect(res)
        })

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
