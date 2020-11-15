import React from 'react'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../redux/actions/category'
import { Button, Row } from 'antd'
import { Link } from 'react-router-dom'
import PATHS from '../../redux/constants/paths'
import './CategoryList.scss'
function CategoryList(props) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCategories())
  }, [])
  const { listCategories } = useSelector((state) => state.category)
  return (
    <React.Fragment>
      <Row>
        <ul className="category-list">
          {listCategories &&
            listCategories.map((category) => {
              return (
                <li key={category._id} className="category-list__item">
                  <Button
                    type="dashed"
                    size="large"
                    className="category-list__item-btn"
                  >
                    <Link
                      to={`${PATHS.CATEGORY}/${category.slug}`}
                      className="category-list__item-link"
                    >
                      {category.name}
                    </Link>
                  </Button>
                </li>
              )
            })}
        </ul>
      </Row>
    </React.Fragment>
  )
}

CategoryList.propTypes = {}
export default CategoryList
