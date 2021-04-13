import React from 'react'

const UserCard = ({ user }) => {
  return (
    <div className="flex items-center">
      <img src={user.photoURL} alt="avatar" className="w-8 h-8" />
      <div className="pl-3">
        <h3 className="text-base text-gray-900 font">{user.name}</h3>
        <span className="text-xs text-gray-400 pt-0">{user.email}</span>
      </div>
    </div>
  )
}

export default UserCard
