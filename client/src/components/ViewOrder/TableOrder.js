import { EyeOutlined } from '@ant-design/icons'
import { Tag } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React, { useState } from 'react'
import { formatPrice } from '../../helpers/formatPrice'
import ViewOrder from './ViewOrder'

TableOrder.propTypes = {}

function TableOrder({ order, idx, loaduserOrder }) {
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
            <div className="flex items-center">
              <span>{order?.deliveryAddress?.name}</span>
            </div>
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
            {/* <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs"> */}
            <Tag color="warning">{order?.orderStatus?.toUpperCase()}</Tag>
            {/* </span> */}
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
        <ViewOrder order={order} idx={idx} loaduserOrder={loaduserOrder} />
      </Modal>
    </>
  )
}

export default TableOrder
