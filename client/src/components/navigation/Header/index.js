import {
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined,
  ShopOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import React, { useState } from 'react'
import { auth } from '../../../firebase'
import { Link, useHistory } from 'react-router-dom'
import './Header.scss'
import { useDispatch, useSelector } from 'react-redux'
import { logoutInUser } from '../../../redux/actions/users'
import PATHS from '../../../redux/constants/paths'
const { SubMenu, Item } = Menu
const Header = () => {
  const [current, setCurrent] = useState('home')
  const history = useHistory()
  const dispatch = useDispatch()
  const { token, displayName } = useSelector((state) => ({ ...state.user }))
  function handleClick(e) {
    setCurrent(e.key)
  }
  function logout() {
    auth.signOut()
    dispatch(logoutInUser())
    history.push(`/${PATHS.LOGIN}`)
  }
  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      className="nav"
    >
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">HOME</Link>
      </Item>
      <Item key="shop" icon={<ShopOutlined />}>
        <Link to="/shop">SHOP</Link>
      </Item>
      {token && (
        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title={displayName && displayName ? displayName : ''}
          className="nav__user"
        >
          <Item key="setting:1">Option 1</Item>
          <Item key="setting:2">Option 2</Item>
          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
      {!token && (
        <>
          <Item key="login" icon={<UserOutlined />} className="nav__login">
            <Link to="/login">LOGIN</Link>
          </Item>
          <Item
            key="register"
            icon={<UserAddOutlined />}
            className="nav__register"
          >
            <Link to="/register">REGISTER</Link>
          </Item>
        </>
      )}

      {/* <Item key="alipay">
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      </Item> */}
    </Menu>
  )
}

export default Header
