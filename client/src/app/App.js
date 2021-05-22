import { Canvas } from '@react-three/fiber'
import Peer from 'peerjs'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import io from 'socket.io-client'
import { currentUsers } from '../apis/auth'
import CallModal from '../components/Community/ChatApp/CallModal'
import SideDrawer from '../components/Drawer/SideDrawer'
import Footer from '../components/Footer/Footer'
import { HeaderUser } from '../components/navigation/Header'
import Notify from '../components/Notify/Notify'
import { auth } from '../firebase'
import Addressx from '../pages/address'
import { DashBoard } from '../pages/admin'
import AdminPassword from '../pages/admin/AdminPassword'
import CreateAuthor from '../pages/admin/author/CreateAuthor'
import UpdateAuthor from '../pages/admin/author/UpdateAuthor'
import { CreateCategory, UpdateCategory } from '../pages/admin/category'
import { CreateCoupon } from '../pages/admin/coupon'
import { OrdersList } from '../pages/admin/ordersList'
import { CreateProduct, ListProduct } from '../pages/admin/product'
import UpdateProduct from '../pages/admin/product/UpdateProduct'
import {
  CreateSubCategory,
  UpdateSubCategory,
} from '../pages/admin/subCategory'
import { CreateSupplier, UpdateSupplier } from '../pages/admin/supplier'
import { CreateReceipt } from '../pages/admin/warehouse'
import InventoryWareHouseList from '../pages/admin/warehouse/InventoryWareHouseList/InventoryWareHouseList'
import OutWareHouseList from '../pages/admin/warehouse/OutWareHouseList/OutWareHouseList'
import WareHouseList from '../pages/admin/warehouse/WareHouseList'
import ForgotPassword from '../pages/auth/ForgotPassword'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import RegisterComplete from '../pages/auth/RegisterComplete'
import Cart from '../pages/cart/Cart'
import CategoryMainPage from '../pages/category/CategoryMainPage'
import CheckOut from '../pages/checkout/CheckOut'
import Community from '../pages/Community/home/Community'
import Messages from '../pages/Community/message/Messages'
import Profile from '../pages/Community/profile'
import { Home } from '../pages/Home'
import NavBarDropdown from '../pages/Home/NavBarDropdown'
import { Payment } from '../pages/payment'
import { Product } from '../pages/product'
import Shop from '../pages/Shop/Shop'
import SubCategoryMainPage from '../pages/subCategory/SubCategoryMainPage'
import { History, Password, WishList } from '../pages/user'
import UserAddress from '../pages/user/UserAddress'
import UserProfile from '../pages/user/UserProfile'
import { getPostsx } from '../redux/actions/post'
import * as types from '../redux/constants/global'
import * as typesMess from '../redux/constants/message'
import PATHS from '../redux/constants/paths'
import AdminRoute from '../routers/AdminRoute'
import UserRoute from '../routers/UserRoute'
import SocketClient from '../SocketClient'

export default function App() {
  const dispatch = useDispatch()
  let { user: users, homePost, call } = useSelector((state) => state)
  const { pathname } = useLocation()
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch({
          type: 'NOTIFY',
          payload: { loading: true },
        })
        const idTokenUser = await user.getIdTokenResult(true)
        window.localStorage.setItem('token', idTokenUser.token)
        currentUsers()
          .then((res) => {
            if (res.data) {
              const data = {
                token: idTokenUser.token,
                userDatas: res.data,
                notificationsCount: res.data.notifications.newNotifications,
              }
              dispatch({
                type: 'LOGGIN_IN_USER',
                payload: data,
              })
              dispatch({
                type: 'NOTIFY',
                payload: { loading: false },
              })
            }
          })
          .catch((error) => {
            dispatch({
              type: 'NOTIFY',
              payload: { loading: false },
            })
            console.log('errorerrorerrorerrorerrorerror', error)
          })
      }
    })
    const socket = io()
    dispatch({
      type: types.SOCKET,
      payload: socket,
    })
    return () => {
      unsubscribe()
      socket.close()
    }
  }, [dispatch])
  useEffect(() => {
    if (users.token) dispatch(getPostsx())
  }, [dispatch, users.token])
  useEffect(() => {
    const newPeer = new Peer(undefined, {
      host: '/',
      port: '3001',
    })
    dispatch({
      type: typesMess.PEER,
      payload: newPeer,
    })
  }, [dispatch])
  return (
    <React.Fragment>
      {users && users.userDatas?.role !== 'admin' && <HeaderUser />}
      {pathname !== '/' && pathname !== '/admin/dashboard' && (
        <div className="px-4 bg-white hidden md:block">
          <NavBarDropdown />
        </div>
      )}

      {users && users.token && <SocketClient />}
      {call && <CallModal />}
      <Switch>
        <Route exact path={`/${PATHS.LOGIN}`} component={Login} />
        <Route exact path={`/${PATHS.REGISTER}`} component={Register} />
        <Route
          exact
          path={`/${PATHS.REGISTER}/${PATHS.COMPLETE}`}
          component={RegisterComplete}
        />
        <Route
          exact
          path={`/${PATHS.FORGOT}/${PATHS.PASSWORD}`}
          component={ForgotPassword}
        />

        <UserRoute
          exact
          path={`/${PATHS.USER}/${PATHS.HISTORY}`}
          component={History}
        />
        <UserRoute
          exact
          path={`/${PATHS.USER}/${PATHS.ADDRESS}`}
          component={UserAddress}
        />
        <UserRoute
          exact
          path={`/${PATHS.USER}/${PATHS.PROFILE}/:id`}
          component={UserProfile}
        />
        <UserRoute
          exact
          path={`/${PATHS.USER}/${PATHS.PASSWORD}`}
          component={Password}
        />
        <UserRoute
          exact
          path={`/${PATHS.USER}/${PATHS.WISHLIST}`}
          component={WishList}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.PASSWORD}`}
          component={AdminPassword}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.DASHBOARD}`}
          component={DashBoard}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.CATEGORY}`}
          component={CreateCategory}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.CATEGORY}/:slug`}
          component={UpdateCategory}
        />

        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.SUB_CATEGORY}`}
          component={CreateSubCategory}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.SUB_CATEGORY}/:slug`}
          component={UpdateSubCategory}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.AUTHOR}`}
          component={CreateAuthor}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.AUTHOR}/:slug`}
          component={UpdateAuthor}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.SUPPLIER}`}
          component={CreateSupplier}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.SUPPLIER}/:slug`}
          component={UpdateSupplier}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.PRODUCT}`}
          component={CreateProduct}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.PRODUCT}/:slug`}
          component={UpdateProduct}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.LIST_PRODUCTS}`}
          component={ListProduct}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.WAREHOUSE}`}
          component={CreateReceipt}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.LIST_WAREHOUSE}`}
          component={WareHouseList}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.OUT_WAREHOUSE}`}
          component={OutWareHouseList}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.INVENTORY_WAREHOUSE}`}
          component={InventoryWareHouseList}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.COUPON}`}
          component={CreateCoupon}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.ORDER}`}
          component={OrdersList}
        />
        <Route exact path={`/${PATHS.PRODUCT}/:slug`} component={Product} />
        <Route
          exact
          path={`/${PATHS.CATEGORY}/:slug`}
          component={CategoryMainPage}
        />
        <Route
          exact
          path={`/${PATHS.SUB_CATEGORY}/:slug`}
          component={SubCategoryMainPage}
        />
        <Route exact path={`/${PATHS.CART}`} component={Cart} />
        <Route exact path={`/${PATHS.CHECKOUT}`} component={CheckOut} />
        <Route exact path={`/${PATHS.ADDRESS}`} component={Addressx} />
        <Route exact path={`/${PATHS.PAYMENT}`} component={Payment} />
        <Route exact path={`/${PATHS.HOME}`} component={Home} />
        <Route exact path={`/${PATHS.SHOP}`} component={Shop} />
        <Route exact path={`/${PATHS.COMMUNITY}`} component={Community} />
        <Route
          exact
          path={`/${PATHS.COMMUNITY}/${PATHS.PROFILE}/:id`}
          component={Profile}
        />
        <Route
          exact
          path={`/${PATHS.COMMUNITY}/${PATHS.MESSAGE}`}
          component={Messages}
        />
        <Route
          exact
          path={`/${PATHS.COMMUNITY}/${PATHS.MESSAGE}/:id`}
          component={Messages}
        />
      </Switch>
      {pathname !== '/admin/dashboard' && <Footer />}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Notify />
      <SideDrawer />
    </React.Fragment>
  )
}
