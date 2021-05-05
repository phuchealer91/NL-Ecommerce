import React, { useEffect } from 'react'
import { Image } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { currentUsers } from '../apis/auth'
import SideDrawer from '../components/Drawer/SideDrawer'
import GlobalLoading from '../components/GlobalLoading/GlobalLoading'
import { HeaderAdmin, HeaderUser } from '../components/navigation/Header'
import Notify from '../components/Notify/Notify'
import { auth } from '../firebase'
import Addressx from '../pages/address'
import { DashBoard } from '../pages/admin'
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
import ForgotPassword from '../pages/auth/ForgotPassword'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import RegisterComplete from '../pages/auth/RegisterComplete'
import Cart from '../pages/cart/Cart'
import CategoryMainPage from '../pages/category/CategoryMainPage'
import CheckOut from '../pages/checkout/CheckOut'
import { Home } from '../pages/Home'
import { Payment } from '../pages/payment'
import { Product } from '../pages/product'
import Shop from '../pages/Shop/Shop'
import Community from '../pages/Community/home/Community'
import SubCategoryMainPage from '../pages/subCategory/SubCategoryMainPage'
import { History, Password, WishList } from '../pages/user'
import { notify } from '../redux/actions/notify'
import {
  currentUser,
  loginInUser,
  registerOrUpdateUser,
} from '../redux/actions/users'
import PATHS from '../redux/constants/paths'
import AdminRoute from '../routers/AdminRoute'
import UserRoute from '../routers/UserRoute'
import Profile from '../pages/Community/profile'
import { getPostsx } from '../redux/actions/post'
import { CreateReceipt } from '../pages/admin/warehouse'
import WareHouseList from '../pages/admin/warehouse/WareHouseList'
import OutWareHouseList from '../pages/admin/warehouse/OutWareHouseList/OutWareHouseList'
import InventoryWareHouseList from '../pages/admin/warehouse/InventoryWareHouseList/InventoryWareHouseList'

export default function App() {
  const dispatch = useDispatch()
  let { user: users, homePost } = useSelector((state) => state)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(notify(true))
        const idTokenUser = await user.getIdTokenResult(true)
        await window.localStorage.setItem('token', idTokenUser.token)
        currentUsers()
          .then((res) => {
            if (res.data) {
              const data = {
                token: idTokenUser.token,
                userDatas: res.data,
              }
              dispatch({
                type: 'LOGGIN_IN_USER',
                payload: data,
              })
              dispatch(notify(false))
            }
          })
          .catch((error) => {
            dispatch(notify(false))
            console.log('errorerrorerrorerrorerrorerror', error)
          })
      }
    })
    return () => unsubscribe()
  }, [dispatch])
  useEffect(() => {
    if (users.token) dispatch(getPostsx())
  }, [dispatch, users.token])
  return (
    <React.Fragment>
      {users && users.userDatas.role !== 'admin' && <HeaderUser />}
      {/* <Image.PreviewGroup>
        <Image
          width={200}
          src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
        />
        <Image
          width={200}
          src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
        />
      </Image.PreviewGroup> */}
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
      </Switch>
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
