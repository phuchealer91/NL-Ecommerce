import React from 'react'
import PropTypes from 'prop-types'
import { Card, Tooltip } from 'antd'
import imageDefault from '../../assets/images/mac-default.png'
import { Link } from 'react-router-dom'
import './CartItem.scss'
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import _ from 'lodash'
import { addToCart } from '../../redux/actions/cart'
import { useDispatch } from 'react-redux'
import { showDrawer } from '../../redux/actions/ui'
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
          boxShadow: '0 4px 2px 0 rgba(0,0,0,0.05)',
          border: '0',
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
        <Meta
          title={`${title} - $${price}`}
          description={`${description && description.substring(0, 40)}...`}
        />
      </Card>
    </>
  )
}
CardItem.propTypes = {}

export default CardItem
