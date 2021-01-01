import React from 'react'
import PropTypes from 'prop-types'
import { Card, Col, Input, Rate, Row, Tabs, Tooltip, Form, Divider } from 'antd'
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import ProductListItem from '../ProductListItem/index'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import imageDefault from '../../assets/images/mac-default.png'
import './SingleProduct.scss'
import _ from 'lodash'
import { addToCart } from '../../redux/actions/cart'
import { useDispatch } from 'react-redux'
import { showDrawer } from '../../redux/actions/ui'
import ModalRating from '../ModalConfirm/ModalRating'
import { format } from 'date-fns'
import ShowRatings from '../Ratings/ShowRatings'
const { TabPane } = Tabs
function SingleProduct({ productEditing }) {
  const { title, quantity, images, description } = productEditing
    ? productEditing
    : ''
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
      ...productEditing,
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
  function handleAddToWishlist() {}
  return (
    <>
      <Row gutter={[2, 12]}>
        <Col xs={24} sm={24} md={24} lg={14}>
          {images && images.length ? (
            <Carousel
              showArrows={true}
              autoPlay
              infiniteLoop
              width="500px"
              className="carousel__fix"
            >
              {images &&
                images.map((i) => <img src={i.url} key={i.public_id} />)}
            </Carousel>
          ) : (
            <Card
              cover={<img src={imageDefault} className="mb-3 card-image" />}
            ></Card>
          )}

          <Tabs type="card">
            <TabPane tab="Description" key="1">
              {description && description}
            </TabPane>
            <TabPane tab="More" key="2">
              Call use on xxxx xxx xxx to learn more about this product.
            </TabPane>
          </Tabs>
        </Col>
        <Col xs={24} sm={24} md={24} lg={10}>
          <h2 className="text-2xl font-semibold text-green-600">
            {title?.toUpperCase()}
          </h2>
          {productEditing &&
          productEditing.reviews &&
          productEditing.reviews.length > 0 ? (
            ShowRatings(productEditing)
          ) : (
            <div className="single__rating">No rating yet</div>
          )}
          <Card
            actions={[
              <Tooltip placement="top" title="kk">
                <a onClick={handleAddToCart} disabled={quantity < 1}>
                  <ShoppingCartOutlined className="text-danger" />
                  <br />
                  {quantity < 1 ? 'Out of Stock' : 'Add To Cart'}
                </a>
              </Tooltip>,
              <a onClick={handleAddToWishlist}>
                <HeartOutlined className="text-info" /> <br /> Add to Wishlist
              </a>,

              <ModalRating productId={productEditing?._id}>
                {/* <StarRating
                  name={_id}
                  numberOfStars={5}
                  rating={star}
                  changeRating={onStarClick}
                  isSelectable={true}
                  starRatedColor="red"
                /> */}
                <Form.Item
                  name="rating"
                  rules={[{ required: true, message: 'Please choose rating!' }]}
                >
                  <Rate size className="pb-2" />
                </Form.Item>
                <Form.Item
                  name="comment"
                  rules={[
                    { required: true, message: 'Please input your comment!' },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
              </ModalRating>,
            ]}
          >
            <ProductListItem productEditing={productEditing} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24}>
          <h3 className="my-3 text-2xl font-semibold">
            Rating and reviews (
            <span className="text-red-600">
              {productEditing?.reviews.length}
            </span>
            )
          </h3>
          <Divider dashed />
          {productEditing &&
            productEditing.reviews.map((rating, idx) => {
              return (
                <div className="pb-2" key={idx}>
                  <div className="flex items-end">
                    <div className="flex items-center content-center">
                      <div className="py-1 px-2 bg-gray-300 rounded-sm font-semibold">
                        {rating.name.slice(0, 1).toUpperCase()}
                      </div>
                      <h3 className="text-xl font-semibold mx-2">
                        {rating.name}
                      </h3>
                    </div>
                    <p className="text-gray-600">
                      {format(
                        new Date(productEditing?.updatedAt),
                        'dd/MM/yyyy'
                      )}
                    </p>
                  </div>
                  <Rate value={rating.rating} disabled />
                  <p className="text-lg">{rating.comment}</p>
                  <Divider dashed />
                </div>
              )
            })}
        </Col>
      </Row>
    </>
  )
}
SingleProduct.propTypes = {}

export default SingleProduct
