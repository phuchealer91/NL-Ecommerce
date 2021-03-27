import { DollarOutlined, DownSquareOutlined } from '@ant-design/icons'
import { Col, Menu, Row, Slider, Spin } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchProductsSearch, getListAllProducts } from '../../apis/product'
import { CardItem } from '../../components/CardItem'
import { formatPrice } from '../../helpers/formatPrice'
import { searchQuery } from '../../redux/actions/search'

function Shop(props) {
  const history = useHistory()
  const dispatch = useDispatch()
  const [price, setPrice] = useState([0, 0])
  const [ok, setOk] = useState(false)
  const [productsAll, setProductsAll] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { text } = useSelector((state) => state.search)
  useEffect(() => {
    loadAllProducts()
  }, [])
  function loadAllProducts() {
    getListAllProducts(12).then(
      (res) => setProductsAll(res.data.products),
      setIsLoading(false)
    )
  }
  function loadProductsFilter(value) {
    fetchProductsSearch(value).then((res) => setProductsAll(res.data.products))
  }
  useEffect(() => {
    let cleared = setTimeout(() => {
      loadProductsFilter({ query: text })
      if (!text) {
        loadAllProducts()
      }
    }, 300)
    return () => clearTimeout(cleared)
  }, [text])
  useEffect(() => {
    loadProductsFilter({ price: price })
  }, [ok])
  function handleSlider(value) {
    dispatch(searchQuery(''))
    setPrice(value)
    setTimeout(() => {
      setOk(!ok)
    }, 300)
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
                  tipFormatter={(v) => `${v}đ`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="500000"
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
          <h3 className="text-2xl text-green-600 font-semibold pb-3 pl-3">
            Products
          </h3>

          {productsAll.length < 1 && (
            <span className="text-gray-700 font-semibold text-xl pl-3">
              No products found
            </span>
          )}
          <div className="grid mx-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-auto grid-flow-row gap-4 mt-6">
            {productsAll &&
              productsAll.map((product) => {
                return (
                  <div className="product-item" key={product._id}>
                    <CardItem product={product} />
                  </div>
                )
              })}
          </div>
        </Col>
      </Row>
    </React.Fragment>
  )
}
Shop.propTypes = {}

export default Shop
