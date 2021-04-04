import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SideDrawer from '../components/Drawer/SideDrawer'
import GlobalLoading from '../components/GlobalLoading/GlobalLoading'
import Header from '../components/navigation/Header'
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
import SubCategoryMainPage from '../pages/subCategory/SubCategoryMainPage'
import { History, Password, WishList } from '../pages/user'
import { currentUser, registerOrUpdateUser } from '../redux/actions/users'
import PATHS from '../redux/constants/paths'
import AdminRoute from '../routers/AdminRoute'
import UserRoute from '../routers/UserRoute'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenUser = await user.getIdTokenResult()
        const data = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          token: idTokenUser.token,
        }
        dispatch(registerOrUpdateUser(data))
        dispatch(currentUser(data))

        // dispatch(loginInUser(data))
      }
    })
    return () => unsubscribe()
  }, [])
  return (
    <React.Fragment>
      <Header />
      <div className="pt-2 mb-4">
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
