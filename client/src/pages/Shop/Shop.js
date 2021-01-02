import { DollarOutlined, DownSquareOutlined } from '@ant-design/icons'
import { Col, Menu, Row, Slider, Spin } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchProductsSearch, getListAllProducts } from '../../apis/product'
import { CardItem } from '../../components/CardItem'

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
          <h4 className="p-3 pl-2 text-green-600 font-semibold text-lg">
            Search/Filter
          </h4>

          <Menu
            defaultOpenKeys={['1', '2', '3', '4', '5', '6', '7']}
            mode="inline"
          >
            {/* price */}
            <SubMenu
              key="1"
              title={
                <span className="h6 flex items-center">
                  <DollarOutlined /> <span>Price</span>
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `$${v}`}
                  range
                  // value={price}
                  // onChange={handleSlider}
                  max="4999"
                />
              </div>
            </SubMenu>
            {/* Category */}
            <SubMenu
              key="2"
              title={
                <span className="h6 flex items-center">
                  <DownSquareOutlined /> <span>Categories</span>
                </span>
              }
            >
              {/* <div style={{ maringTop: '-10px' }}>{showCategories()}</div> */}
            </SubMenu>
          </Menu>
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
