import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './ProductListItem.scss'
function ProductListItem({ productEditing }) {
  console.log(productEditing)
  const {
    title,
    price,
    description,
    slug,
    quantity,
    sold,
    category,
    brand,
    color,
    shipping,
    subs,
  } = productEditing ? productEditing : ''

  return (
    <>
      <ul className="list-group">
        <li className="list-group-item">
          Price <span className="list-group__right">{price} VND</span>
        </li>

        {category && (
          <li className="list-group-item">
            Category{' '}
            <Link
              to={`/category/${category.slug}`}
              className="list-group__right"
            >
              {category.name}
            </Link>
          </li>
        )}

        {subs && (
          <li className="list-group-item">
            Sub Categories
            {subs.map((s) => (
              <Link
                key={s._id}
                to={`/sub-category/${s.slug}`}
                className="list-group__right"
              >
                {s.name}
              </Link>
            ))}
          </li>
        )}

        <li className="list-group-item">
          Shipping <span className="list-group__right">{shipping}</span>
        </li>

        <li className="list-group-item">
          Color <span className="list-group__right">{color}</span>
        </li>

        <li className="list-group-item">
          Brand <span className="list-group__right">{brand}</span>
        </li>

        <li className="list-group-item">
          Available <span className="list-group__right">{quantity}</span>
        </li>

        <li className="list-group-item">
          Sold <span className="list-group__right">{sold}</span>
        </li>
      </ul>
    </>
  )
}
ProductListItem.propTypes = {}

export default ProductListItem
