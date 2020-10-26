import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import {
  AppstoreOutlined,
  HeartOutlined,
  HistoryOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import PATHS from '../../../redux/constants/paths'
const { SubMenu } = Menu
const AdminSideBar = () => {
  const history = useHistory()
  const [selectedKey, setSelectedKey] = useState('/')
  const handleClick = (e) => {
    let path = e.key
    if (path === '/home') {
      path = '/'
    }
    setSelectedKey(path)
    history.push(path)
  }
  const location = useLocation()
  useEffect(() => {
    let path = location.pathname
    if (path === '/') {
      path = '/home'
    }
    setSelectedKey(path)
  }, [location])

  return (
    <Menu
      onClick={handleClick}
      style={{ width: 275 }}
      defaultOpenKeys={['sub1', 'sub2']}
      mode="inline"
      selectedKeys={selectedKey}
    >
      <Menu.Item
        icon={<HistoryOutlined />}
        key={`/${PATHS.ADMIN}/${PATHS.DASHBOARD}`}
      >
        Tổng quan
      </Menu.Item>

      <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Danh mục">
        <Menu.Item
          key={`/${PATHS.ADMIN}/${PATHS.CATEGORY}`}
          icon={<UserOutlined />}
        >
          Tất cả danh mục
        </Menu.Item>
      </SubMenu>
      <Menu.Item
        icon={<HistoryOutlined />}
        key={`/${PATHS.ADMIN}/${PATHS.SUB_CATEGORY}`}
      >
        Danh mục con
      </Menu.Item>
      <SubMenu key="sub3" icon={<AppstoreOutlined />} title="Sản phẩm">
        <Menu.Item
          key={`/${PATHS.ADMIN}/${PATHS.PRODUCT}`}
          icon={<UserOutlined />}
        >
          Tạo mới sản phẩm
        </Menu.Item>
        <Menu.Item
          key={`/${PATHS.USER}/${PATHS.WISHLIST}`}
          icon={<HeartOutlined />}
        >
          Danh sách yêu thích
        </Menu.Item>
      </SubMenu>
      <Menu.Item
        icon={<HistoryOutlined />}
        key={`/${PATHS.ADMIN}/${PATHS.COUPON}`}
      >
        Mã giảm giá
      </Menu.Item>
      <Menu.Item
        icon={<HistoryOutlined />}
        key={`/${PATHS.USER}/${PATHS.PASSWORD}`}
      >
        Đổi mật khẩu
      </Menu.Item>
    </Menu>
  )
}

export default AdminSideBar
