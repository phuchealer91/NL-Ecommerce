import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUsers, unFollowUsers } from '../../../redux/actions/profile'

const FollowBtn = ({ userx }) => {
  const [followed, setFollowed] = useState(false)
  const { user, profile } = useSelector((state) => state)
  const dispatch = useDispatch()
  console.log(
    'useruseruseruseruseruseruseruseruseruseruser',
    user.userDatas.following
  )
  console.log('userxuserxuserxuserxuserxuserxuserx', userx)
  if (user && user.userDatas !== undefined) {
    console.log(
      'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      user.userDatas.following?.find((x) => x._id === userx._id)
    )
  }
  useEffect(() => {
    if (user.userDatas.following?.find((x) => x._id === userx._id)) {
      setFollowed(true)
    }
  }, [user?.userDatas.following, userx._id])
  function onHandleUnFollow() {
    setFollowed(false)
    dispatch(unFollowUsers({ users: profile.users, userx, user }))
  }
  function onHandleFollow() {
    setFollowed(true)
    dispatch(followUsers({ users: profile.users, userx, user }))
  }
  return (
    <>
      {followed ? (
        <button
          onClick={onHandleUnFollow}
          className="flex justify-center  max-h-max whitespace-nowrap  focus:ring  rounded max-w-max border  border-red-600 border-solid  text-white hover:bg-red-600   items-center hover:shadow-lg font-bold py-2 px-4  mr-0 ml-auto"
        >
          Bỏ theo dõi
        </button>
      ) : (
        <button
          onClick={onHandleFollow}
          className="flex justify-center  max-h-max whitespace-nowrap  focus:ring  rounded max-w-max border  border-white border-solid  text-white hover:bg-blue-400   items-center hover:shadow-lg font-bold py-2 px-4  mr-0 ml-auto"
        >
          Theo dõi
        </button>
      )}
    </>
  )
}

export default FollowBtn
