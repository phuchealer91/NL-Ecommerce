import { Col, Row } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { CardItem } from '../../components/CardItem'
import LoadingCard from '../../components/LoadingCard'
import { getSubCategory } from '../../redux/actions/subCategory'
import './SubCategoryMainPage.scss'
function SubCategoryMainPage(props) {
  const dispatch = useDispatch()
  const { productOfSubCategory, subCategoryEditing, isLoading } = useSelector(
    (state) => state.subCategory
  )
  const { slug } = useParams()
  useEffect(() => {
    dispatch(getSubCategory(slug))
  }, [dispatch, slug])
  return (
    <React.Fragment>
      <div className="sub-category-main">
        <h3 className="sub-category-main__heading">
          Tìm thấy{' '}
          <span className="sub-category-main__red">
            {productOfSubCategory?.length}
          </span>{' '}
          sản phẩm trong danh mục con{' '}
          <span className="sub-category-main__red">
            {subCategoryEditing?.name}
          </span>
        </h3>
        <div className="sub-category-main__list">
          {isLoading ? (
            <LoadingCard count={4} />
          ) : (
            <Row gutter={[2, 12]}>
              {productOfSubCategory &&
                productOfSubCategory.map((product) => {
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

SubCategoryMainPage.propTypes = {}

export default SubCategoryMainPage
