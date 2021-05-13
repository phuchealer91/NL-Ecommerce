import React, { useState } from 'react'
import { Drawer, Button } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import './NavBar.css'
import HeaderAdmin from '../Header/HeaderAdmin'

const NavBar = ({ menu }) => {
  const [visible, setVisible] = useState(false)
  return (
    <nav className="navbar z-10 bg-white shadow-md dark:bg-gray-800">
      <Button
        className="menu"
        type="primary"
        icon={<MenuOutlined />}
        onClick={() => setVisible(true)}
      />
      <Drawer
        title="Danh sách"
        placement="left"
        onClick={() => setVisible(false)}
        onClose={() => setVisible(false)}
        visible={visible}
        bodyStyle={{ padding: 0 }}
        width="256px"
      >
        {menu}
      </Drawer>
      {/* <a href="/">
        <img
          src="https://developer.logicblox.com/content/docs/api-reference/wb-framework/lblogo.png"
          className="logo"
          alt="logo"
        />
      </a> */}
    </nav>
  )
}

export default NavBar
