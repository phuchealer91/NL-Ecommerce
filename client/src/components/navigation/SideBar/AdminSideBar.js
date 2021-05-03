import {
  AppstoreOutlined,
  HeartOutlined,
  HistoryOutlined,
  ShoppingOutlined,
  TagOutlined,
  TagsOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
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
      style={{ width: 275, height: '100vh' }}
      defaultOpenKeys={['sub1', 'sub2', 'sub3']}
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
          icon={<TagsOutlined />}
        >
          Tất cả danh mục
        </Menu.Item>
        <Menu.Item
          key={`/${PATHS.ADMIN}/${PATHS.SUB_CATEGORY}`}
          icon={<TagOutlined />}
        >
          Danh mục con
        </Menu.Item>
      </SubMenu>
      <SubMenu key="sub3" icon={<AppstoreOutlined />} title="Tác giả">
        <Menu.Item
          key={`/${PATHS.ADMIN}/${PATHS.AUTHOR}`}
          icon={<TagsOutlined />}
        >
          Tất cả tác giả
        </Menu.Item>
      </SubMenu>
      <SubMenu key="sub4" icon={<AppstoreOutlined />} title="Nhà cung cấp">
        <Menu.Item
          key={`/${PATHS.ADMIN}/${PATHS.SUPPLIER}`}
          icon={<TagsOutlined />}
        >
          Tất cả nhà cung cấp
        </Menu.Item>
      </SubMenu>
      <SubMenu key="sub5" icon={<AppstoreOutlined />} title="Sản phẩm">
        <Menu.Item
          key={`/${PATHS.ADMIN}/${PATHS.PRODUCT}`}
          icon={<ShoppingOutlined />}
        >
          Tạo mới sản phẩm
        </Menu.Item>
        <Menu.Item
          key={`/${PATHS.ADMIN}/${PATHS.LIST_PRODUCTS}`}
          icon={<HeartOutlined />}
        >
          Tất cả sản phẩm
        </Menu.Item>
      </SubMenu>
      <SubMenu key="sub6" icon={<AppstoreOutlined />} title="Kho">
        <Menu.Item
          key={`/${PATHS.ADMIN}/${PATHS.WAREHOUSE}`}
          icon={<ShoppingOutlined />}
        >
          Nhập kho
        </Menu.Item>
        <Menu.Item
          key={`/${PATHS.ADMIN}/${PATHS.LIST_WAREHOUSE}`}
          icon={<HeartOutlined />}
        >
          Tất cả đơn hàng
        </Menu.Item>
        <Menu.Item
          key={`/${PATHS.ADMIN}/${PATHS.OUT_WAREHOUSE}`}
          icon={<HeartOutlined />}
        >
          Xuất kho
        </Menu.Item>
        <Menu.Item
          key={`/${PATHS.ADMIN}/${PATHS.INVENTORY_WAREHOUSE}`}
          icon={<HeartOutlined />}
        >
          Tồn kho
        </Menu.Item>
      </SubMenu>
      <Menu.Item
        icon={<ShoppingOutlined />}
        key={`/${PATHS.ADMIN}/${PATHS.ORDER}`}
      >
        Đơn đặt hàng
      </Menu.Item>

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
