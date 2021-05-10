import {
  DownOutlined,
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Badge, Dropdown, Menu } from 'antd'
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
            <nav className="nav flex items-center justify-end">
              <div>
                {' '}
                <UserLogined />
              </div>
              <Dropdown
                overlay={
                  <Menu>
                    <Item icon={<HomeOutlined />}>
                      <Link to="/admin/dashboard" className="py-2 px-3">
                        Trang chủ
                      </Link>
                    </Item>
                    <Item icon={<LogoutOutlined />} onClick={logout}>
                      <span className="py-2 px-3">Đăng xuất</span>
                    </Item>
                  </Menu>
                }
                trigger={['click']}
              >
                <button className="cursor-pointer flex items-center">
                  <img
                    className="w-8 h-8 rounded-full mr-2"
                    src={user?.userDatas?.photoURL}
                    width={32}
                    height={32}
                    alt="User"
                  />
                  <div className="flex items-center">
                    {' '}
                    <span className="pr-2 text-gray-600 font-semibold">
                      {user && user.userDatas.name}
                    </span>{' '}
                    <DownOutlined style={{ fontSize: '14px' }} />
                  </div>
                </button>
              </Dropdown>
            </nav>
          </div>
        </div>

        {/* hello main*/}
      </header>
    </>
  )
}

export default HeaderAdmin
