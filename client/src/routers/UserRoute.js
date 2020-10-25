import React from 'react'
import { Route, Link, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PATHS from '../redux/constants/paths'
const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }))
  return user && user.token ? (
    <Route {...rest}  />
  ) : (
    <Redirect to={`/${PATHS.LOGIN}`} />
  )
}

export default UserRoute
