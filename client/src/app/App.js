import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from '../components/navigation/Header'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import RegisterComplete from '../pages/auth/RegisterComplete'
import Home from '../pages/Home'
import PATHS from '../redux/contants/paths'
function App() {
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
    </>
  )
}

export default App
