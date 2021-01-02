import {
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Badge, Menu } from 'antd'
import React, { useState } from 'react'
import { auth } from '../../../firebase'
import { Link, useHistory } from 'react-router-dom'
import './Header.scss'
import { useDispatch, useSelector } from 'react-redux'
import { logoutInUser } from '../../../redux/actions/users'
import PATHS from '../../../redux/constants/paths'
import { TOKEN } from '../../../redux/constants/keys'
import { Searchs } from '../../LocalSearch'
const { SubMenu, Item } = Menu
const Header = () => {
  const [current, setCurrent] = useState('home')
  const history = useHistory()
  const dispatch = useDispatch()
  let { user, cart } = useSelector((state) => ({ ...state }))
  let { cartLists } = cart
  function handleClick(e) {
    setCurrent(e.key)
  }
  function logout() {
    auth.signOut()
    localStorage.removeItem(TOKEN)
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
      <Item key="home" className="block flex items-center">
        <span>
          <ShopOutlined />
        </span>
        <Link to="/" className="">
          HOME
        </Link>
      </Item>
      <Item key="shop" icon={<ShopOutlined />}>
        <Link to="/shop">SHOP</Link>
      </Item>
      <Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart">
          <Badge count={cartLists.length} offset={[9, 0]}>
            CART
          </Badge>
        </Link>
      </Item>

      {user && user.token ? (
        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title={user && user.name ? user.name : ''}
          className="nav__user"
        >
          {user && user.role === 'admin' ? (
            <Item>
              <Link to="/admin/dashboard">DashBoard</Link>
            </Item>
          ) : (
            <Item>
              <Link to="/user/history">DashBoard</Link>
            </Item>
          )}
          <Item key="setting:2">Option 2</Item>
          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      ) : null}
      <Item className="nav__login">
        <Searchs />
      </Item>

      {user && !user.token ? (
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
      ) : null}
    </Menu>
  )
}

export default Header
