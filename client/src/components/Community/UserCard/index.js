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
        {/* <Link
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
        </Link> */}
        <Link
          key={user._id}
          to={`/community/profile/${user._id}`}
          onClick={onHandleAll}
          className="flex justify-between items-center p-3 hover:bg-gray-100 rounded-lg relative"
        >
          <div className="w-12 h-12 relative flex flex-shrink-0">
            <img
              className="shadow-md rounded-full w-full h-full object-cover"
              src={user.photoURL}
              alt={user.photoURL}
            />
            <div className="absolute border-2 border-sold border-white rounded-full bottom-0 right-0">
              <div className="bg-green-500 rounded-full w-2 h-2"></div>
            </div>
          </div>
          <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
            <p className="text-gray-600">{user.name}</p>
            <span className="text-xs text-gray-400 pt-0">{user.email}</span>
            {/* <div className="flex items-center text-sm text-gray-600">
              <div className="min-w-0">
                <p className="truncate">Happy birthday to you my friend!</p>
              </div>
              <p className="mx-1 text-xs whitespace-no-wrap">2 Oct</p>
            </div> */}
          </div>
          {/* <div className="w-4 h-4 flex flex-shrink-0 hidden md:block group-hover:block">
            <img
              className="rounded-full w-full h-full object-cover"
              alt="user2"
              src="https://randomuser.me/api/portraits/men/32.jpg"
            />
          </div> */}
        </Link>
      </div>

      {children}
    </div>
  )
}

export default UserCard
