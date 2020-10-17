import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import GlobalLoading from '../components/GlobalLoading/GlobalLoading'
import Header from '../components/navigation/Header'
import { auth } from '../firebase'
import ForgotPassword from '../pages/auth/ForgotPassword'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import RegisterComplete from '../pages/auth/RegisterComplete'
import Home from '../pages/Home'
import { loginInUser } from '../redux/actions/users'
import PATHS from '../redux/constants/paths'
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenUser = await user.getIdTokenResult()
        const data = {
          displayName: user.displayName,
          email: user.email,
          token: idTokenUser.token,
        }
        dispatch(loginInUser(data))
      }
    })
    return () => unsubscribe()
  }, [dispatch])
  return (
    <>
      <Header />
      <Switch>
        <Route exact path={`/${PATHS.LOGIN}`} component={Login} />
        <Route exact path={`/${PATHS.REGISTER}`} component={Register} />
        <Route
          exact
          path={`/${PATHS.REGISTER}/${PATHS.COMPLETE}`}
          component={RegisterComplete}
        />
        <Route
          exact
          path={`/${PATHS.FORGOT}/${PATHS.PASSWORD}`}
          component={ForgotPassword}
        />
        <Route exact path={`/${PATHS.HOME}`} component={Home} />
      </Switch>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <GlobalLoading />
    </>
  )
}

export default App
