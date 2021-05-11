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
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addWishLists } from '../../apis/cart'
import imageDefault from '../../assets/images/mac-default.png'
import { formatPrice, formatPriceSale } from '../../helpers/formatPrice'
import { addToCart } from '../../redux/actions/cart'
import { showDrawer } from '../../redux/actions/ui'
import ShowRatings from '../Ratings/ShowRatings'
function CardItem({ product }) {
  const { title, price, slug, quantity, sale } = product
  const image = product.images[0].url
  const dispatch = useDispatch()
  const history = useHistory()
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
  function onHanleWishList(e) {
    e.preventDefault()
    addWishLists({ productId: product._id })
      .then((res) => {
        if (res) {
          toast.success('Đã thêm vào yêu thích')
          history.push('/user/wishlist')
        }
      })
      .catch((error) => {
        toast.error('Lỗi thêm yêu thích', error)
      })
  }
  return (
    <>
      <div className="relative p-4">
        <Link to={`/product/${slug}`} className="block">
          <img
            src={image ? image : imageDefault}
            alt={image}
            style={{
              height: '220px',
              width: '220px',
              objectFit: 'cover',
            }}
          />
        </Link>

        <div className="product-item__footer bg-white relative">
          <p className="text-sm pt-4 text-gray-600 text-center">{title}</p>
          <div className="star text-center">
            {product && product.reviews && product.reviews.length > 0 ? (
              <span style={{ fontSize: '14px' }}>{ShowRatings(product)}</span>
            ) : (
              <span className="py-1 block">
                <Rate disabled style={{ fontSize: '14px' }} />
                <span className="text-gray-600 pl-2">(0 đánh giá)</span>
              </span>
            )}
          </div>

          <div className="my-1">
            {sale > 0 ? (
              <>
                <div className="text-blue-600 text-base font-semibold">
                  {formatPriceSale(price, sale)}đ
                </div>
                <div className="mt-1 text-gray-400 text-sm line-through">
                  {formatPrice(price)}đ
                </div>{' '}
              </>
            ) : (
              <div className="text-blue-600 text-base font-semibold">
                {formatPrice(price)}đ
              </div>
            )}
          </div>
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
              <Link to="#" onClick={onHanleWishList}>
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
