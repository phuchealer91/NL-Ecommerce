import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { createComments } from '../../../redux/actions/comment'

InputComment.propTypes = {}

function InputComment({ children, post }) {
  const [contentComment, setContentComment] = useState('')
  const { user } = useSelector((state) => state)
  const disptach = useDispatch()
  function onHandleSubmitComment(e) {
    e.preventDefault()
    if (!contentComment.trim()) return
    setContentComment('')
    const newComment = {
      content: contentComment,
      likes: [],
      postBy: user.userDatas,
      createAt: new Date().toISOString(),
    }
    disptach(createComments(post, newComment, user))
  }
  return (
    <>
      <div className="px-4 pt-4">
        <h2 className="pb-2 text-white text-lg">Bình luận</h2>
        <form
          className="w-full bg-gray-800 rounded-lg px-4 pt-2"
          onSubmit={onHandleSubmitComment}
        >
          {children}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-full px-3 mb-2 flex items-center">
              <input
                type="text"
                name="content"
                value={contentComment}
                placeholder="Thêm bình luận"
                onChange={(e) => setContentComment(e.target.value)}
                className="bg-gray-800 text-base text-white flex-1 border-none overflow-auto outline-none py-2"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-blue-600"
              >
                Đăng
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
export default InputComment
