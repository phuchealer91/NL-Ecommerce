import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import GlobalLoading from '../components/GlobalLoading/GlobalLoading'
import Header from '../components/navigation/Header'
import { auth } from '../firebase'
import ForgotPassword from '../pages/auth/ForgotPassword'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import RegisterComplete from '../pages/auth/RegisterComplete'
import { History, Password, WishList } from '../pages/user'
import { CreateCategory, UpdateCategory } from '../pages/admin/category'
import UserRoute from '../routers/UserRoute'
import AdminRoute from '../routers/AdminRoute'
import { Home } from '../pages/Home'
import { Product } from '../pages/product'
import {
  loginInUser,
  currentUser,
  registerOrUpdateUser,
} from '../redux/actions/users'
import PATHS from '../redux/constants/paths'
import { DashBoard } from '../pages/admin'
import {
  CreateSubCategory,
  UpdateSubCategory,
} from '../pages/admin/subCategory'
import { CreateProduct, ListProduct } from '../pages/admin/product'
import UpdateProduct from '../pages/admin/product/UpdateProduct'
import CategoryMainPage from '../pages/category/CategoryMainPage'
import SubCategoryMainPage from '../pages/subCategory/SubCategoryMainPage'
import Cart from '../pages/cart/Cart'
import SideDrawer from '../components/Drawer/SideDrawer'
import CheckOut from '../pages/checkout/CheckOut'
import { CreateCoupon } from '../pages/admin/coupon'
import { OrdersList } from '../pages/admin/ordersList'
import { Payment } from '../pages/payment'
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenUser = await user.getIdTokenResult()
        const { token } = idTokenUser
        const data = {
          email: user.email,
          token: idTokenUser.token,
        }
        dispatch(registerOrUpdateUser(data))
        dispatch(currentUser(data))

        // dispatch(loginInUser(data))
      }
    })
    return () => unsubscribe()
  }, [dispatch])
  return (
    <React.Fragment>
      <Header />
      <div className="mx-4 my-4">
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
          <Route exact path={`/${PATHS.PAYMENT}`} component={Payment} />
          <Route exact path={`/${PATHS.HOME}`} component={Home} />
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
        <GlobalLoading />
        <SideDrawer />
      </div>
    </React.Fragment>
  )
}

export default App
