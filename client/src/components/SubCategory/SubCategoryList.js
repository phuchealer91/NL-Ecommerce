import React from 'react'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSubCategories } from '../../redux/actions/subCategory'
import { Button, Row } from 'antd'
import { Link } from 'react-router-dom'
import PATHS from '../../redux/constants/paths'
import './SubCategoryList.scss'
function SubCategoryList(props) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getSubCategories())
  }, [])
  const { listSubCategories } = useSelector((state) => state.subCategory)
  return (
    <React.Fragment>
      <Row>
        <ul className="subCategory-list">
          {listSubCategories &&
            listSubCategories.map((subCategory) => {
              return (
                <li key={subCategory._id} className="subCategory-list__item">
                  <Button
                    type="dashed"
                    size="large"
                    className="subCategory-list__item-btn"
                    danger
                  >
                    <Link
                      to={`${PATHS.SUB_CATEGORY}/${subCategory.slug}`}
                      className="subCategory-list__item-link"
                    >
                      {subCategory.name}
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

SubCategoryList.propTypes = {}
export default SubCategoryList
