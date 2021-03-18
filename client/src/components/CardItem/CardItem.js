import {
  EyeOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
} from '@ant-design/icons'
import { Rate, Tooltip } from 'antd'
import _ from 'lodash'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import imageDefault from '../../assets/images/mac-default.png'
import { formatPrice } from '../../helpers/formatPrice'
import { addToCart } from '../../redux/actions/cart'
import { showDrawer } from '../../redux/actions/ui'
import ShowRatings from '../Ratings/ShowRatings'
import './CartItem.scss'
function CardItem({ product }) {
  const { title, price, slug, quantity } = product
  const image = product.images[0].url
  const dispatch = useDispatch()
  function handleAddToCart() {
    let cart = []
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
    }
    // push new product
    cart.push({
      ...product,
      count: 1,
    })
    // remove duplicates
    let unique = _.uniqBy(cart, (c) => c._id)
    // let unique = _.uniqWith(cart, _.isEqual)
    // save localstorage
    localStorage.setItem('cart', JSON.stringify(unique))
    dispatch(addToCart(unique))
    dispatch(showDrawer())
  }
  return (
    <>
      <div className="relative">
        <Link to={`/product/${slug}`} className="block">
          <img
            src={image ? image : imageDefault}
            alt=""
            className="product__item-image"
          />
        </Link>

        <div className="product-item__footer bg-white text-center relative">
          <p className=" font-light text-lg pt-4 text-gray-500">{title}</p>
          <div className="star">
            {product && product.reviews && product.reviews.length > 0 ? (
              <span style={{ fontSize: '14px' }}>{ShowRatings(product)}</span>
            ) : (
              <span className="text-center py-1 block">
                <Rate disabled style={{ fontSize: '20px' }} />
              </span>
            )}
          </div>
          <span className="text-sm text-gray-600 mt-1 ">
            {product.description.substring(0, 30)}...
          </span>
          <p className="money mt-1 text-blue-600">{formatPrice(price)}đ</p>
        </div>
        {/* hidden */}
        <div className="desktop__add-to-cart  xl:block ">
          <button
            onClick={handleAddToCart}
            disabled={quantity < 1}
            className=" btn btn-primary btn-addToCart uppercase mx-auto "
          >
            <span className="mr-2">
              {' '}
              <ShoppingOutlined className="leading-none" />
            </span>
            <span>{quantity < 1 ? 'Tạm hết hàng' : 'Thêm vào giỏ hàng'}</span>
          </button>
        </div>
        <div className="mobile__add-to-cart">
          <button
            onClick={handleAddToCart}
            disabled={quantity < 1}
            className="btn btn-primary btn-addToCart uppercase mx-auto "
          >
            <span className="mr-2">
              {' '}
              <ShoppingOutlined className="leading-none" />
            </span>
            <span>{quantity < 1 ? 'Tạm hết hàng' : 'Thêm vào giỏ hàng'}</span>
          </button>
        </div>
        <div className="product-item__tools">
          <div className="flex align-center flex-row justify-center lg:flex-col">
            <Tooltip placement="left" title="Xem chi tiết">
              <Link to={`/product/${slug}`}>
                <EyeOutlined />
              </Link>
            </Tooltip>
            <Tooltip placement="left" title="Yêu thích">
              <Link to="/">
                <HeartOutlined />
              </Link>
            </Tooltip>
            <Tooltip
              placement="left"
              title={quantity < 1 ? 'Tạm hết hàng' : 'Thêm vào giỏ hàng'}
            >
              <Link to="#" onClick={handleAddToCart} disabled={quantity < 1}>
                <ShoppingCartOutlined />
              </Link>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  )
}
CardItem.propTypes = {}

export default CardItem
