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
        <ul className="flex item-center text-white content-center">
          {listCategories &&
            listCategories.map((category) => {
              return (
                <li
                  key={category._id}
                  className="bg-green-500 rounded-xl p-8 mr-2 w-50 h-50"
                >
                  <Link
                    to={`${PATHS.CATEGORY}/${category.slug}`}
                    className="text-white font-semibold text-xl hover:text-gray-800"
                  >
                    {category.name.toUpperCase()}
                  </Link>
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
