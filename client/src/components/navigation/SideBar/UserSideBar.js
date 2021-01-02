import {
  AppstoreOutlined,
  HeartOutlined,
  HistoryOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import PATHS from '../../../redux/constants/paths'
const { SubMenu } = Menu
const UserSideBar = () => {
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
        key={`/${PATHS.USER}/${PATHS.HISTORY}`}
      >
        Lịch sử
      </Menu.Item>

      <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Thao Tác">
        <Menu.Item
          key={`/${PATHS.USER}/${PATHS.PASSWORD}`}
          icon={<UserOutlined />}
        >
          Mật khẩu
        </Menu.Item>
        <Menu.Item
          key={`/${PATHS.USER}/${PATHS.WISHLIST}`}
          icon={<HeartOutlined />}
        >
          Danh sách yêu thích
        </Menu.Item>
      </SubMenu>
    </Menu>
  )
}

export default UserSideBar
