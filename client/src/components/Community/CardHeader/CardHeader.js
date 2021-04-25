import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Dropdown, Menu } from 'antd'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from '@ant-design/icons'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import Status from '../Home/Status'
import Modal from 'antd/lib/modal/Modal'
import * as types from '../../../redux/constants/post'
CardHeader.propTypes = {}

function CardHeader({ post }) {
  const { user } = useSelector((state) => state)
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [modalText, setModalText] = useState('Content of the modal')

  const onHandleEdit = (post) => {
    setVisible(true)
    dispatch({
      type: types.STATUS_POST,
      payload: { ...post, onEdit: true },
    })
  }

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds')
    setConfirmLoading(true)
    setTimeout(() => {
      setVisible(false)
      setConfirmLoading(false)
    }, 1000)
  }
  function onHandleSubmit() {}
  const handleCancel = () => {
    setVisible(false)
  }
  return (
    <>
      <div className="flex  p-4 pb-0">
        <div className=" w-full block">
          <div className="flex">
            <Link
              to={`/community/profile/${post.postBy._id}`}
              className="block"
            >
              <img
                className="inline-block h-10 w-10 rounded-full border-2 border-blue-500"
                src={post.postBy.photoURL}
                alt={post.postBy.photoURL}
              />
            </Link>
            <div className="pl-3 flex flex-col w-full">
              <div className="flex items-start justify-between">
                <span>
                  <Link
                    to={`/community/profile/${post.postBy._id}`}
                    className="hover:underline text-white  block"
                  >
                    <p className="text-base  font-semibold text-white ">
                      {post.postBy.name}
                    </p>
                  </Link>
                </span>
                <span>
                  <Dropdown
                    overlay={
                      <Menu>
                        {user.userDatas._id === post.postBy._id && (
                          <>
                            <Menu.Item>
                              <div
                                className="flex items-center"
                                onClick={() => onHandleEdit(post)}
                              >
                                <EditOutlined
                                  className="text-blue-600"
                                  style={{ fontSize: '16px' }}
                                />{' '}
                                <span className="ml-2 text-base text-gray-600">
                                  Chỉnh sửa
                                </span>
                              </div>
                            </Menu.Item>

                            <Menu.Item>
                              <div className="flex items-center">
                                <DeleteOutlined
                                  className="text-red-600"
                                  style={{ fontSize: '16px' }}
                                />{' '}
                                <span className="ml-2 text-base text-gray-600">
                                  Xóa bài viết
                                </span>
                              </div>
                            </Menu.Item>
                          </>
                        )}
                        <Menu.Item>
                          <div className="flex items-center">
                            <CopyOutlined
                              className="text-green-600"
                              style={{ fontSize: '16px' }}
                            />{' '}
                            <span className="ml-2 text-base text-gray-600">
                              Sao chép bài viết
                            </span>
                          </div>
                        </Menu.Item>
                      </Menu>
                    }
                  >
                    <span className="text-white hover:text-blue-600 transition">
                      <EllipsisOutlined
                        style={{
                          fontSize: '24px',
                          cursor: 'pointer',
                        }}
                      />
                    </span>
                  </Dropdown>
                </span>
              </div>
              <span className="text-xs  font-medium text-gray-300  transition ease-in-out duration-150">
                {moment(post.createdAt).fromNow()}{' '}
                {/* <span className="text-xs pl-2">
                  ({post.updatedAt && 'Đã chỉnh sửa'})
                </span> */}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardHeader
