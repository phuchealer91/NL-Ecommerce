import React from 'react'
import PropTypes from 'prop-types'
import { Card, Col, Row, Tabs, Tooltip } from 'antd'
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import ProductListItem from '../ProductListItem/index'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import imageDefault from '../../assets/images/mac-default.png'
import './SingleProduct.scss'
const { TabPane } = Tabs
function SingleProduct({ productEditing }) {
  const { title, quantity, images, description } = productEditing
    ? productEditing
    : ''
  function handleAddToCart() {}
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
          <h2>{title}</h2>
          {/* {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : ( */}
          <div className="single__rating">No rating yet</div>
          {/* )} */}
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
              // <RatingModal>
              //   <StarRating
              //     name={_id}
              //     numberOfStars={5}
              //     rating={star}
              //     changeRating={onStarClick}
              //     isSelectable={true}
              //     starRatedColor="red"
              //   />
              // </RatingModal>,
            ]}
          >
            <ProductListItem productEditing={productEditing} />
          </Card>
        </Col>
      </Row>
    </>
  )
}
SingleProduct.propTypes = {}

export default SingleProduct
