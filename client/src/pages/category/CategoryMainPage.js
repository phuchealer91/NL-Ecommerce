import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getCategory } from '../../redux/actions/category'
import { useParams } from 'react-router-dom'
import LoadingCard from '../../components/LoadingCard'
import { Col, Row } from 'antd'
import { CardItem } from '../../components/CardItem'
import './CategoryMainPage.scss'
function CategoryMainPage(props) {
  const dispatch = useDispatch()
  const { productOfCategory, categoryEditing, isLoading } = useSelector(
    (state) => state.category
  )
  const { slug } = useParams()
  useEffect(() => {
    dispatch(getCategory(slug))
  }, [dispatch])
  return (
    <React.Fragment>
      <div className="category-main">
        <h3 className="category-main__heading">
          Tìm thấy{' '}
          <span className="category-main__red">
            {productOfCategory?.length}
          </span>{' '}
          sản phẩm trong danh mục{' '}
          <span className="category-main__red">{categoryEditing?.name}</span>
        </h3>
        <div className="category-main__list">
          {isLoading ? (
            <LoadingCard count={4} />
          ) : (
            <Row gutter={[2, 12]}>
              {productOfCategory &&
                productOfCategory.map((product) => {
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
    </React.Fragment>
  )
}

export default CategoryMainPage
