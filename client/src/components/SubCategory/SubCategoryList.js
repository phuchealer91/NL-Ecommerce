import { Button, Row } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getSubCategories } from '../../redux/actions/subCategory'
import PATHS from '../../redux/constants/paths'
import './SubCategoryList.scss'
function SubCategoryList(props) {
  const dispatch = useDispatch()
  const { listSubCategories } = useSelector((state) => state.subCategory)
  useEffect(() => {
    dispatch(getSubCategories())
  }, [dispatch])
  return (
    <React.Fragment>
      <Row>
        <ul className="subCategory-list justify-center content-center">
          {listSubCategories &&
            listSubCategories.map((subCategory) => {
              return (
                <li
                  key={subCategory._id}
                  className="subCategory-list__item bg-gray-100 rounded-lg p-3 mr-2 mb-2 w-30"
                >
                  <Link
                    to={`${PATHS.SUB_CATEGORY}/${subCategory.slug}`}
                    className="subCategory-list__item-link hover:text-green-600"
                  >
                    {subCategory.name}
                  </Link>
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
