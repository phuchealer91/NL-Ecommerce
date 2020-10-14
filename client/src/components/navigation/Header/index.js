import {
  HomeOutlined,
  SettingOutlined,
  ShopOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'
const { SubMenu, Item } = Menu

const Header = () => {
  const [current, setCurrent] = useState('home')
  function handleClick(e) {
    setCurrent(e.key)
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
      <SubMenu
        key="SubMenu"
        icon={<SettingOutlined />}
        title="User-Name"
        className="nav__user"
      >
        <Item key="setting:1">Option 1</Item>
        <Item key="setting:2">Option 2</Item>
      </SubMenu>
      <Item key="login" icon={<UserOutlined />} className="nav__login">
        <Link to="/login">LOGIN</Link>
      </Item>
      <Item key="register" icon={<UserAddOutlined />} className="nav__register">
        <Link to="/register">REGISTER</Link>
      </Item>

      {/* <Item key="alipay">
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      </Item> */}
    </Menu>
  )
}

export default Header
