import { Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { CardItem } from '../../components/CardItem'
import LoadingCard from '../../components/LoadingCard'
import { SingleProduct } from '../../components/SingleProduct'
import { getProduct, getRelated } from '../../redux/actions/product'
import './Product.scss'
function Product(props) {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const { productEditing, productRelated, reviews } = useSelector(
    (state) => state.product
  )
  const { slug } = useRouteMatch().params
  useEffect(() => {
    dispatch(getProduct(slug))
  }, [dispatch, reviews, slug])
  useEffect(() => {
    setIsLoading(true)
    if (productEditing && productEditing._id) {
      dispatch(getRelated(productEditing._id))
      setIsLoading(false)
    }
  }, [dispatch, productEditing])
  return (
    <React.Fragment>
      <div className="single-product">
        <h3 className="single-product__heading">Chi tiết sản phẩm</h3>
        <SingleProduct productEditing={productEditing} />
        <div className="single-product__related">
          <h3 className="single-product__heading">Sản phẩm liên quan</h3>
          <div className="single-product__list">
            {isLoading ? (
              <LoadingCard count={4} />
            ) : (
              <Row gutter={[2, 12]}>
                {productRelated &&
                  productRelated.map((product) => {
                    return (
                      <Col xs={24} sm={24} md={12} lg={6} key={product._id}>
                        <CardItem product={product} />
                      </Col>
                    )
                  })}
              </Row>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
Product.propTypes = {}
export default Product
