import React from 'react'
import { formatPrice } from '../../../../helpers/formatPrice'
TableInventoryWarehouse.propTypes = {}

function TableInventoryWarehouse({ product }) {
  return (
    <>
      <tbody className="text-gray-600 text-sm font-light">
        <tr className="border-b border-gray-200 hover:bg-gray-100">
          <td className="py-3 px-6 text-left whitespace-nowrap">
            <div className="flex items-center">
              <span className="font-medium">
                {product?._id.substring(0, 10)}
              </span>
            </div>
          </td>
          <td className="py-3 px-6 text-left">
            <div className="flex items-center">
              <span> {product?.title.substring(0, 20)}</span>
            </div>
          </td>

          <td className="py-3 px-6 text-left">
            <div className="flex items-center">
              <span> {product?.category?.name.substring(0, 30)}</span>
            </div>
          </td>
          <td className="py-3 px-6 text-left">
            <div className="flex items-center">
              <img
                src={product?.images[0]?.url}
                width="80px"
                height="auto"
                loading="lazy"
              />
            </div>
          </td>
          <td className="py-3 px-6 text-left">
            <div className="flex items-center">
              <span> {product?.totalQuantity}</span>
            </div>
          </td>
          <td className="py-3 px-6 text-left">
            <div className="flex items-center">
              <span>
                {' '}
                {product?.quantity > 0 ? product?.quantity : 'Hết hàng'}
              </span>
            </div>
          </td>
          <td className="py-3 px-6 text-left">
            <div className="flex items-center">
              <span> {formatPrice(product?.price)}đ</span>
            </div>
          </td>
        </tr>
      </tbody>
    </>
  )
}

export default TableInventoryWarehouse
