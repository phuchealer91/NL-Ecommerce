import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Tag } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import { formatPrice } from '../../helpers/formatPrice'
import ViewOrder from './ViewOrder'
import Modal from 'antd/lib/modal/Modal'
import ViewOrderAdmin from './ViewOrderAdmin'

TableOrderAdmin.propTypes = {}

function TableOrderAdmin({ order, loadAllOrders }) {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      <tbody className="text-gray-600 text-sm font-light">
        <tr className="border-b border-gray-200 hover:bg-gray-100">
          <td className="py-3 px-6 text-left whitespace-nowrap">
            <div className="flex items-center">
              <span className="font-medium">
                {' '}
                {order?.paymentIntent?.id.substring(0, 10)}
              </span>
            </div>
          </td>
          <td className="py-3 px-6 text-left">
            <ul className="list-disc text-xs">
              <li className="pb-1">Tên: {order?.deliveryAddress?.name}</li>
              <li className="pb-1">
                ĐC: {order?.deliveryAddress?.mainAddress}
              </li>
              <li className="pb-1">SĐT: {order?.deliveryAddress?.phone}</li>
            </ul>
          </td>
          <td className="py-3 px-6 text-center">
            <div className="">{formatPrice(order?.paymentIntent?.amount)}đ</div>
          </td>
          <td className="py-3 px-6 text-center">
            <span className="">
              {new Date(order?.paymentIntent?.created * 1000).toLocaleString()}
            </span>
          </td>
          <td className="py-3 px-6 text-center">
            {order?.orderStatus === 'Đang chờ xác nhận' ? (
              <Tag color="#999">{order?.orderStatus}</Tag>
            ) : order?.orderStatus === 'Đang xử lý' ? (
              <Tag color="orange-inverse">{order?.orderStatus}</Tag>
            ) : order?.orderStatus === 'Đã bàn giao' ? (
              <Tag color="green-inverse">{order?.orderStatus}</Tag>
            ) : (
              <Tag color="red-inverse">{order?.orderStatus}</Tag>
            )}
          </td>
          <td className="py-3 px-6 text-center">
            <div
              className="flex item-center justify-center cursor-pointer"
              onClick={showModal}
            >
              <EyeOutlined className="cursor-pointer" />
            </div>
          </td>
        </tr>
      </tbody>
      <Modal
        title="Chi tiết đơn hàng"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width="80%"
        height="auto"
      >
        <ViewOrderAdmin order={order} loadAllOrders={loadAllOrders} />
      </Modal>
    </>
  )
}

export default TableOrderAdmin
