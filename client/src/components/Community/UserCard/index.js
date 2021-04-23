import React from 'react'
import { Link } from 'react-router-dom'

const UserCard = ({
  children,
  user,
  onHandleClose,
  setShowFollowing,
  setShowFollowers,
}) => {
  function onHandleAll() {
    if (onHandleClose) onHandleClose()
    if (setShowFollowing) setShowFollowing(false)
    if (setShowFollowers) setShowFollowers(false)
  }
  return (
    <div className="flex items-center justify-between">
      <div className="w-full">
        <Link
          key={user._id}
          to={`/community/profile/${user._id}`}
          onClick={onHandleAll}
          className=" py-3 px-3 block hover:bg-gray-100 border-gray-400 border-b"
        >
          <div className="flex items-center">
            <img src={user.photoURL} alt="avatar" className="w-8 h-8" />
            <div className="pl-3">
              <h3 className="text-base text-gray-900 font">{user.name}</h3>
              <span className="text-xs text-gray-400 pt-0">{user.email}</span>
            </div>
          </div>
        </Link>
      </div>
      {children}
    </div>
  )
}

export default UserCard
