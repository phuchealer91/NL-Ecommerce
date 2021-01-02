import React from 'react'
import PropTypes from 'prop-types'
import { Card, Rate, Tooltip } from 'antd'
import imageDefault from '../../assets/images/mac-default.png'
import { Link } from 'react-router-dom'
import './CartItem.scss'
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import _ from 'lodash'
import { addToCart } from '../../redux/actions/cart'
import { useDispatch } from 'react-redux'
import { showDrawer } from '../../redux/actions/ui'
import { formatPrice } from '../../helpers/formatPrice'
import ShowRatings from '../Ratings/ShowRatings'
const { Meta } = Card
function CardItem({ product }) {
  const { title, price, description, slug, quantity } = product
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
      <Card
        style={{
          width: 312,
          height: 'auto',
          borderRadius: '4px',
          background: '#ffffff',
          boxShadow: '0 4px 2px 0 rgba(0,0,0,0.2)',
        }}
        cover={
          <img
            src={image ? image : imageDefault}
            style={{
              height: '200px',
              objectFit: 'cover',
              padding: '1px',
              borderRadius: '4px',
            }}
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" /> <br /> View Product
          </Link>,
          <Tooltip title="Thêm sản phẩm">
            <a onClick={handleAddToCart} disabled={quantity < 1}>
              <ShoppingCartOutlined className="text-danger" /> <br />
              {quantity < 1 ? 'Out of stock' : 'Add to Cart'}
            </a>
          </Tooltip>,
        ]}
      >
        <h3 className="text-lg font-medium pb-1">{title}</h3>
        <h4 className="text-red-600 font-bold text-sm pb-1">
          {formatPrice(price)} VND
        </h4>
        <div className="text-gray-700">
          {/* {description && description.substring(0, 40)}... */}
          {product && product.reviews && product.reviews.length > 0 ? (
            <span style={{ fontSize: '14px' }}>{ShowRatings(product)}</span>
          ) : (
            <span className="text-center py-1 block">No rating yet</span>
          )}
        </div>
      </Card>
    </>
  )
}
CardItem.propTypes = {}

export default CardItem
