import {
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Badge, Menu } from 'antd'
import React, { useState } from 'react'
// import './HeaderAdmin.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../../../firebase'
import UserLogined from '../../../pages/auth/Login/UserLogined'
import { logoutInUser } from '../../../redux/actions/users'
import { TOKEN } from '../../../redux/constants/keys'
import PATHS from '../../../redux/constants/paths'
import { Searchs } from '../../LocalSearch'
import {
  SubCategoryK,
  SubCategoryN,
  SubCategoryT,
  SubCategoryV,
} from '../../SubCategory/'

const { SubMenu, Item } = Menu
const HeaderAdmin = () => {
  const [current, setCurrent] = useState('home')
  const history = useHistory()
  const dispatch = useDispatch()
  let { user, cart } = useSelector((state) => state)
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
    <>
      <header className="header  bg-white ">
        <div className="desktop-header hidden lg:block ">
          <div className="container mx-auto px-11 py-2">
            <nav className="nav flex  relative">
              <UserLogined />
              <div className="right-0 absolute">
                <Menu
                  onClick={handleClick}
                  selectedKeys={[current]}
                  mode="horizontal"
                  className="nav"
                >
                  <Item className="nav__login">
                    <Searchs />
                  </Item>
                  {user && user.token ? (
                    <SubMenu
                      key="SubMenu"
                      icon={() => <img src={user.userDatas.photoURL} />}
                      title={
                        user && user.userDatas.name ? user.userDatas.name : ''
                      }
                      className="nav__user"
                    >
                      <Item icon={<HomeOutlined />}>
                        <Link to="/admin/dashboard">Trang chủ</Link>
                      </Item>
                      <Item icon={<LogoutOutlined />} onClick={logout}>
                        Đăng xuất
                      </Item>
                    </SubMenu>
                  ) : null}

                  {user && !user.token ? (
                    <Item>
                      <Item
                        key="login"
                        icon={<UserOutlined />}
                        className="nav__login"
                      >
                        <Link to="/login">Đăng nhập</Link>
                      </Item>
                      <Item
                        key="register"
                        icon={<UserAddOutlined />}
                        className="nav__register"
                      >
                        <Link to="/register">Đăng ký</Link>
                      </Item>
                    </Item>
                  ) : null}
                </Menu>
              </div>
            </nav>
          </div>
        </div>

        {/* hello main*/}
      </header>
    </>
  )
}

export default HeaderAdmin
