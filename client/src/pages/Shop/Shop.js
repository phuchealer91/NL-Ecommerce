import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Row, Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getListAllProduct } from '../../redux/actions/product'
import { CardItem } from '../../components/CardItem'
import { productSearch } from '../../redux/actions/search'
import { fetchProductsSearch, getListAllProducts } from '../../apis/product'
import { useHistory } from 'react-router-dom'

function Shop(props) {
  const history = useHistory()
  const [productsAll, setProductsAll] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { text } = useSelector((state) => state.search)
  useEffect(() => {
    loadAllProducts()
  }, [history])
  function loadAllProducts() {
    getListAllProducts(12).then(
      (res) => setProductsAll(res.data.products),
      setIsLoading(false)
    )
  }
  useEffect(() => {
    let cleared = setTimeout(() => {
      loadProductsFilter({ query: text })
    }, 300)
    return () => clearTimeout(cleared)
  }, [text])
  function loadProductsFilter(value) {
    fetchProductsSearch(value).then(
      (res) => setProductsAll(res.data.products),
      setIsLoading(false)
    )
  }
  return (
    <React.Fragment>
      <Row gutter={[2, 12]}>
        <Col xs={6} sm={6} md={6} lg={6}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
          deserunt totam reiciendis eum tempore cum quibusdam aliquam
          repudiandae facere dolor.
        </Col>
        <Col xs={18} sm={18} md={18} lg={18}>
          {isLoading ? (
            <Spin />
          ) : (
            <h3 className="text-2xl text-green-600 font-semibold pb-3">
              Products
            </h3>
          )}

          {productsAll.length < 1 && (
            <span className="text-gray-700 font-semibold text-xl">
              No products found
            </span>
          )}
          <Row gutter={[2, 12]}>
            {productsAll &&
              productsAll.map((product) => {
                return (
                  <Col xs={24} sm={24} md={8} lg={8} key={product._id}>
                    <CardItem product={product} />
                  </Col>
                )
              })}
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  )
}
Shop.propTypes = {}

export default Shop
