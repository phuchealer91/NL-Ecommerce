import { DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { Tag } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React, { useState } from 'react'
import ViewReceipts from './ViewReceipts'

TableReceipts.propTypes = {}

function TableReceipts({ receipt, idx, loadUserReceipts }) {
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
                {receipt?._id.substring(0, 6)}
              </span>
            </div>
          </td>
          <td className="py-3 px-6 text-left">
            <div className="flex items-center">
              <span>{receipt?.supplier?.name.substring(0, 20)}</span>
            </div>
          </td>
          <td className="py-3 px-6 text-center">
            <span className="">
              {new Date(receipt.createdAt).toLocaleString()}
            </span>
          </td>
          <td className="py-3 px-6 text-center">
            {/* {formatPrice(order?.paymentIntent?.amount)}đ */}
            <span>
              {receipt.statusReceipt === true ? (
                <Tag color="green">Đã duyệt</Tag>
              ) : (
                <Tag color="red">Chưa duyệt</Tag>
              )}
            </span>
          </td>
          <td className="py-3 px-6 text-center">
            <div
              className="flex item-center justify-center cursor-pointer"
              onClick={showModal}
            >
              <EyeOutlined className="cursor-pointer" />
            </div>
          </td>
          <td className="py-3 px-6 text-center">
            <DeleteOutlined style={{ color: 'red' }} />
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
        <ViewReceipts
          receipt={receipt}
          idx={idx}
          loadUserReceipts={loadUserReceipts}
        />
      </Modal>
    </>
  )
}

export default TableReceipts
