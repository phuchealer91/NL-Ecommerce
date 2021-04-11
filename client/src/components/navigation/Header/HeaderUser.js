import {
  LogoutOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Badge, Menu } from 'antd'
import React, { useState } from 'react'
// import './HeaderUser.scss'
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
const HeaderUser = () => {
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
    <>
      <header className="header">
        <div className="desktop-header bg-white hidden lg:block">
          <div className="container mx-auto px-11">
            <nav className="nav flex justify-between relative">
              <div className="flex items-center">
                <a href="/" className="inline-block mb-2 mr-2">
                  <img
                    src="./assests/images/Logo_95x.png"
                    alt="Wokiee"
                    className="mr-6"
                  />
                </a>
                <ul className="flex items-center">
                  <li className="mr-6">
                    <Link
                      to="/"
                      className="text-sm color-secondary hover:text-blue-500 transition-all pt-2 pb-2 inline-block"
                    >
                      TRANG CHỦ
                    </Link>
                  </li>
                  <li className="mr-6">
                    <Link
                      to="/shop"
                      className="text-sm color-secondary hover:text-blue-500 transition-all pt-2 pb-2 inline-block"
                    >
                      KHO SÁCH
                    </Link>
                  </li>

                  <li className="mr-6 dropdown-hover">
                    <Link
                      to="# "
                      className="stc text-sm color-secondary hover:text-blue-500 transition-all pt-2 pb-2 inline-block"
                    >
                      SÁCH TRONG NƯỚC
                    </Link>
                    <div className="dropdown-menu grid-rows-3">
                      <div className="grid row-span-2 ">
                        <div className="col-span-7 grid grid-cols-3">
                          <ul className="group">
                            <p className="text-sm font-semibold uppercase mb-3 group-hover:text-blue-500 transition-all">
                              VĂN HỌC
                            </p>
                            <SubCategoryV />
                          </ul>
                          <ul className="group">
                            <p className="text-sm font-semibold uppercase mb-3 group-hover:text-blue-500  transition-all">
                              KINH TẾ
                            </p>
                            <SubCategoryK />
                          </ul>
                          <ul className="group">
                            <p className="text-sm font-semibold uppercase mb-3 group-hover:text-blue-500 transition-all transition-all">
                              THIẾU NHI
                            </p>
                            <SubCategoryT />
                          </ul>
                          <ul className="group mt-6">
                            <p className="text-sm font-semibold uppercase mb-3 group-hover:text-blue-500 transition-all transition-all">
                              NGOẠI NGỮ
                            </p>
                            <SubCategoryN />
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="mr-6 dropdown-hover">
                    <Link
                      to="# "
                      className="text-sm color-secondary hover:text-blue-500 transition-all pt-2 pb-2 inline-block"
                    >
                      SÁCH NGOÀI NƯỚC
                    </Link>
                    <div className="dropdown-menu">
                      <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-9 grid grid-cols-3 gap-4">
                          <ul className="group">
                            <p className="text-sm font-semibold uppercase mb-3 group-hover:text-blue-500 transition-all">
                              TOPS
                            </p>
                            <li className="mb-1">
                              <Link to="# ">
                                <img
                                  src="./assests/images/mm_04_400x.png"
                                  alt=""
                                />
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="# "
                                className="capitalize leading-5 c-text-1 hover:text-blue-500 transition-all"
                              >
                                Awesome
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="# "
                                className="capitalize leading-5 c-text-1 hover:text-blue-500 transition-all"
                              >
                                Beachwear
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="# "
                                className="capitalize leading-5 c-text-1 hover:text-blue-500 transition-all"
                              >
                                Beige
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="# "
                                className="capitalize leading-5 c-text-1 hover:text-blue-500 transition-all"
                              >
                                Cool
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="# "
                                className="capitalize leading-5 c-text-1 hover:text-blue-500 transition-all"
                              >
                                Dress
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="# "
                                className="capitalize leading-5 c-text-1 hover:text-blue-500 transition-all"
                              >
                                Gap
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="# "
                                className="capitalize leading-5 c-text-1 hover:text-blue-500 transition-all"
                              >
                                Guess
                              </Link>
                            </li>
                          </ul>
                          <ul className="group">
                            <p className="text-sm font-semibold uppercase mb-3 group-hover:text-blue-500 transition-all transition-all">
                              BOTTOMS
                            </p>
                            <li className="mb-1">
                              <Link to="# ">
                                <img
                                  src="./assests/images/mm_05_400x.png"
                                  alt=""
                                />
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="# "
                                className="capitalize leading-5 c-text-1 hover:text-blue-500 transition-all"
                              >
                                Jean
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="# "
                                className="capitalize leading-5 c-text-1 hover:text-blue-500 transition-all"
                              >
                                Lacoste
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="# "
                                className="capitalize leading-5 c-text-1 hover:text-blue-500 transition-all"
                              >
                                Levi's
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="# "
                                className="capitalize leading-5 c-text-1 hover:text-blue-500 transition-all"
                              >
                                Model
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="# "
                                className="capitalize leading-5 c-text-1 hover:text-blue-500 transition-all"
                              >
                                Nice
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="# "
                                className="capitalize leading-5 c-text-1 hover:text-blue-500 transition-all"
                              >
                                Polo
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="# "
                                className="capitalize leading-5 c-text-1 hover:text-blue-500 transition-all"
                              >
                                Pullover
                              </Link>
                            </li>
                          </ul>
                          <ul className="group">
                            <p className="text-sm font-semibold uppercase mb-3 group-hover:text-blue-500 transition-all transition-all">
                              ACCESSORIES
                            </p>
                            <li className="mb-1">
                              <Link to="# ">
                                <img
                                  src="./assests/images/mm_06_400x.png"
                                  alt=""
                                />
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="# "
                                className="capitalize leading-5 c-text-1 hover:text-blue-500 transition-all"
                              >
                                Scarf
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="# "
                                className="capitalize leading-5 c-text-1 hover:text-blue-500 transition-all"
                              >
                                Shirt
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="# "
                                className="capitalize leading-5 c-text-1 hover:text-blue-500 transition-all"
                              >
                                Shoes
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="# "
                                className="capitalize leading-5 c-text-1 hover:text-blue-500 transition-all"
                              >
                                Shorts
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="# "
                                className="capitalize leading-5 c-text-1 hover:text-blue-500 transition-all"
                              >
                                Summer
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="# "
                                className="capitalize leading-5 c-text-1 hover:text-blue-500 transition-all"
                              >
                                Sunglasses
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="# "
                                className="capitalize leading-5 c-text-1 hover:text-blue-500 transition-all"
                              >
                                Vintage
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="col-span-3 relative">
                          <Link to="# " className="mt-2 block">
                            <img src="./assests/images/mm_03_410x.png" alt="" />
                          </Link>
                          <div className="absolute top-8 left-6">
                            <div>
                              <p className="font-semibold text-white mt-1">
                                SALE
                              </p>
                              <p className="font-semibold text-white mt-1 text-3xl">
                                70% OFF
                              </p>
                            </div>
                            <p className="font-light text-white mt-1 text-sm">
                              Free shipping on all US order or order above $99
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li className="mr-6">
                    <Link
                      to="# "
                      className="text-sm color-secondary hover:text-blue-500 transition-all pt-2 pb-2 inline-block"
                    >
                      CỘNG ĐỒNG
                    </Link>
                  </li>
                  {/* <li className="mr-6">
                    <a
                      href
                      className="text-sm color-secondary hover:text-blue-500 transition-all pt-2 pb-2 inline-block"
                    >
                      HỖ TRỢ
                    </a>
                  </li> */}
                </ul>
              </div>
              <ul className="flex items-center">
                {/* <li className="ml-6 relative">
                  <button className="nav__btn">
                    <i className="fal fa-search hover:text-blue-500 transition-all" />
                  </button>
                  <div className="absolute left-2/4 transform -translate-x-2/4 bg-white shadow-sm rounded-lg px-2 text-sm text-center align-middle tooltip">
                    Search
                  </div>
                </li> */}
                <li className="ml-6 relative">
                  <span className="mr-2">
                    <ShoppingCartOutlined />
                  </span>
                  <Link to="/cart">
                    <Badge count={cartLists.length} offset={[9, 0]}>
                      GIỎ HÀNG
                    </Badge>
                  </Link>
                </li>
                <li className="ml-6 relative">
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
                        icon={<SettingOutlined />}
                        title={user && user.name ? user.name : ''}
                        className="nav__user"
                      >
                        <Item>
                          <Link to="/user/history">DashBoard</Link>
                        </Item>

                        <Item key="setting:2">Option 2</Item>
                        <Item icon={<LogoutOutlined />} onClick={logout}>
                          Logout
                        </Item>
                      </SubMenu>
                    ) : null}

                    {user && !user.token ? (
                      <>
                        <Item
                          key="login"
                          icon={<UserOutlined />}
                          className="nav__login"
                        >
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
                </li>
                {/* <li className="ml-6 relative">
                  <button className="nav__btn">
                    <UserOutlined />
                  </button>
                  <div className="absolute left-2/4 transform -translate-x-2/4 bg-white shadow-sm rounded-lg px-2 text-sm text-center align-middle tooltip">
                    Account
                  </div>
                </li> */}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mobile-header bg-white lg:hidden">
          <div className="px-6">
            <div className="nav flex items-center relative">
              <div className="mobile-menu inline-block cursor-pointer">
                <i className="far fa-bars" />
              </div>
              <a href="/" className="inline-block mx-auto">
                <img src="./assests/images/Logo_95x.png" alt="Wokiee" />
              </a>
              <ul className="flex items-center absolute right-0">
                <li className="ml-6 relative">
                  <button className="nav__btn">
                    <i className="fal fa-search hover:text-blue-500 transition-all" />
                  </button>
                  <div className="absolute left-2/4 transform -translate-x-2/4 bg-white shadow-sm rounded-lg px-2 text-sm text-center align-middle tooltip">
                    Search
                  </div>
                </li>
                <li className="ml-6 relative">
                  <button className="nav__btn">
                    <i className="fal fa-shopping-cart hover:text-blue-500 transition-all" />
                  </button>
                  <div className="absolute left-2/4 transform -translate-x-2/4 bg-white shadow-sm rounded-lg px-2 text-sm text-center align-middle tooltip">
                    Cart
                  </div>
                </li>
                <li className="ml-6 relative">
                  <button className="nav__btn">
                    <i className="fal fa-user-alt hover:text-blue-500 transition-all" />
                  </button>
                  <div className="absolute left-2/4 transform -translate-x-2/4 bg-white shadow-sm rounded-lg px-2 text-sm text-center align-middle tooltip">
                    Account
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <nav className="panel-menu fixed inset-y-0 left-0 bg-white">
          <ul className="absolute inset-0 py-6 mn1 panel-menu__list">
            <li className="cursor-pointer pb-4 pl-6 panel-menu__close">
              <i className="fal fa-times" />
              <span className="ml-1">Close</span>
            </li>
            <li className="mt-5 flex items-center pl-6 pr-7 cursor-pointer group">
              <Link
                to="/"
                className="uppercase font-light text-sm text-black group-hover:text-blue-600"
              >
                home
              </Link>
            </li>
            <li className="mt-5 flex items-center pl-6 pr-7 cursor-pointer group">
              <Link
                to="/"
                className="uppercase font-light text-sm text-black group-hover:text-blue-600"
              >
                shop
              </Link>
            </li>
            <li className="mt-5 flex items-center pl-6 pr-7 cursor-pointer group">
              <Link
                to="/"
                className="uppercase font-light text-sm text-black group-hover:text-blue-600"
              >
                pages
              </Link>
            </li>
            <li className="mt-5 flex items-center pl-6 pr-7 cursor-pointer group">
              <Link
                to="/"
                className="uppercase font-light text-sm text-black group-hover:text-blue-600"
              >
                blog
              </Link>
            </li>
            <li className="mt-5 flex items-center pl-6 pr-7 cursor-pointer group panel-menu__item">
              <a
                href="#mn2"
                className="uppercase font-light text-sm text-black group-hover:text-blue-600 inline-flex items-center justify-between w-full"
              >
                Sách trong nước
                <i className="fal fa-angle-right text-xl font-light group-hover:text-blue-600" />
              </a>
            </li>
            {/* <li className="mt-5 flex items-center pl-6 pr-7 cursor-pointer group panel-menu__item">
              <a
                href="#mn2"
                className="uppercase font-light text-sm text-black group-hover:text-blue-600 inline-flex items-center justify-between w-full"
              >
                Sách nước ngoài
                <i className="fal fa-angle-right text-xl font-light group-hover:text-blue-600" />
              </a>
            </li> */}
          </ul>
          <ul className="absolute inset-0 py-6 panel-menu__list mn2 hidden">
            <li className="cursor-pointer pb-4 pl-6 mb-6 panel-menu__back">
              <i className="fal fa-angle-left" />
              <span className="ml-1">Back</span>
            </li>
            <Link
              to="/"
              className="uppercase font-medium text-sm mt-5 pl-6 hover:text-blue-600"
            >
              women
            </Link>
            <li className="mt-5 flex items-center pl-6 pr-7 cursor-pointer group panel-menu__item">
              <a
                href="#mn4"
                className="uppercase font-light text-sm text-black group-hover:text-blue-600 inline-flex items-center justify-between w-full"
              >
                top
                <i className="fal fa-angle-right text-xl font-light group-hover:text-blue-600" />
              </a>
            </li>
            <li className="mt-5 flex items-center pl-6 pr-7 cursor-pointer group panel-menu__item">
              <a
                href="#mn5"
                className="uppercase font-light text-sm text-black group-hover:text-blue-600 inline-flex items-center justify-between w-full"
              >
                bottoms
                <i className="fal fa-angle-right text-xl font-light group-hover:text-blue-600" />
              </a>
            </li>
            <li className="mt-5 flex items-center pl-6 pr-7 cursor-pointer group panel-menu__item">
              <a
                href="#mn6"
                className="uppercase font-light text-sm text-black group-hover:text-blue-600 inline-flex items-center justify-between w-full"
              >
                accessories
                <i className="fal fa-angle-right text-xl font-light group-hover:text-blue-600" />
              </a>
            </li>
          </ul>
          <ul className="absolute inset-0 py-6 panel-menu__list mn3 hidden">
            <li className="cursor-pointer pb-4 pl-6 mb-6 panel-menu__back">
              <i className="fal fa-angle-left" />
              <span className="ml-1">Back</span>
            </li>
            <Link
              to="/"
              className="uppercase font-medium text-sm mt-5 pl-6 hover:text-blue-600"
            >
              men
            </Link>
            <li className="mt-5 flex items-center pl-6 pr-7 cursor-pointer group panel-menu__item">
              <a
                href="#mn4"
                className="uppercase font-light text-sm text-black group-hover:text-blue-600 inline-flex items-center justify-between w-full"
              >
                top
                <i className="fal fa-angle-right text-xl font-light group-hover:text-blue-600" />
              </a>
            </li>
            <li className="mt-5 flex items-center pl-6 pr-7 cursor-pointer group panel-menu__item">
              <a
                href="#mn5"
                className="uppercase font-light text-sm text-black group-hover:text-blue-600 inline-flex items-center justify-between w-full"
              >
                bottoms
                <i className="fal fa-angle-right text-xl font-light group-hover:text-blue-600" />
              </a>
            </li>
            <li className="mt-5 flex items-center pl-6 pr-7 cursor-pointer group panel-menu__item">
              <a
                href="#mn6"
                className="uppercase font-light text-sm text-black group-hover:text-blue-600 inline-flex items-center justify-between w-full"
              >
                accessories
                <i className="fal fa-angle-right text-xl font-light group-hover:text-blue-600" />
              </a>
            </li>
          </ul>
          <ul className="absolute inset-0 py-6 panel-menu__list mn4 hidden">
            <li className="cursor-pointer pb-4 pl-6 mb-6 panel-menu__back">
              <i className="fal fa-angle-left" />
              <span className="ml-1">Back</span>
            </li>
            <Link
              to="/"
              className="uppercase font-medium text-sm mt-5 pl-6 hover:text-blue-600"
            >
              Văn học
            </Link>
            {/* <SubCategoryV  /> */}
          </ul>
          <ul className="absolute inset-0 py-6 panel-menu__list mn5 hidden">
            <li className="cursor-pointer pb-4 pl-6 mb-6 panel-menu__back">
              <i className="fal fa-angle-left" />
              <span className="ml-1">Back</span>
            </li>
            <Link
              to="/"
              className="uppercase font-medium text-sm mt-5 pl-6 hover:text-blue-600"
            >
              bottoms
            </Link>
            <li className="mt-5 flex items-center pl-6 pr-7 cursor-pointer group">
              <Link
                to="/"
                className="uppercase font-light text-sm text-black group-hover:text-blue-600"
              >
                jeans
              </Link>
            </li>
            <li className="mt-5 flex items-center pl-6 pr-7 cursor-pointer group">
              <Link
                to="/"
                className="uppercase font-light text-sm text-black group-hover:text-blue-600"
              >
                lacoste
              </Link>
            </li>
            <li className="mt-5 flex items-center pl-6 pr-7 cursor-pointer group">
              <Link
                to="/"
                className="uppercase font-light text-sm text-black group-hover:text-blue-600"
              >
                levi's
              </Link>
            </li>
            <li className="mt-5 flex items-center pl-6 pr-7 cursor-pointer group">
              <Link
                to="/"
                className="uppercase font-light text-sm text-black group-hover:text-blue-600"
              >
                model
              </Link>
            </li>
            <li className="mt-5 flex items-center pl-6 pr-7 cursor-pointer group">
              <Link
                to="/"
                className="uppercase font-light text-sm text-black group-hover:text-blue-600"
              >
                nice
              </Link>
            </li>
            <li className="mt-5 flex items-center pl-6 pr-7 cursor-pointer group">
              <Link
                to="/"
                className="uppercase font-light text-sm text-black group-hover:text-blue-600"
              >
                polo
              </Link>
            </li>
            <li className="mt-5 flex items-center pl-6 pr-7 cursor-pointer group">
              <Link
                to="/"
                className="uppercase font-light text-sm text-black group-hover:text-blue-600"
              >
                pullover
              </Link>
            </li>
          </ul>
          <ul className="absolute inset-0 py-6 panel-menu__list mn6 hidden">
            <li className="cursor-pointer pb-4 pl-6 mb-6 panel-menu__back">
              <i className="fal fa-angle-left" />
              <span className="ml-1">Back</span>
            </li>
            <Link
              to="/"
              className="uppercase font-medium text-sm mt-5 pl-6 hover:text-blue-600"
            >
              accessories
            </Link>
            <li className="mt-5 flex items-center pl-6 pr-7 cursor-pointer group">
              <Link
                to="/"
                className="uppercase font-light text-sm text-black group-hover:text-blue-600"
              >
                scarf
              </Link>
            </li>
            <li className="mt-5 flex items-center pl-6 pr-7 cursor-pointer group">
              <Link
                to="/"
                className="uppercase font-light text-sm text-black group-hover:text-blue-600"
              >
                shirt
              </Link>
            </li>
            <li className="mt-5 flex items-center pl-6 pr-7 cursor-pointer group">
              <Link
                to="/"
                className="uppercase font-light text-sm text-black group-hover:text-blue-600"
              >
                shoes
              </Link>
            </li>
            <li className="mt-5 flex items-center pl-6 pr-7 cursor-pointer group">
              <Link
                to="/"
                className="uppercase font-light text-sm text-black group-hover:text-blue-600"
              >
                shorts
              </Link>
            </li>
            <li className="mt-5 flex items-center pl-6 pr-7 cursor-pointer group">
              <Link
                to="/"
                className="uppercase font-light text-sm text-black group-hover:text-blue-600"
              >
                summer
              </Link>
            </li>
            <li className="mt-5 flex items-center pl-6 pr-7 cursor-pointer group">
              <Link
                to="/"
                className="uppercase font-light text-sm text-black group-hover:text-blue-600"
              >
                sunglasess
              </Link>
            </li>
            <li className="mt-5 flex items-center pl-6 pr-7 cursor-pointer group">
              <Link
                to="/"
                className="uppercase font-light text-sm text-black group-hover:text-blue-600"
              >
                vintage
              </Link>
            </li>
          </ul>
        </nav>
        {/* hello main*/}
      </header>
    </>
  )
}

export default HeaderUser
