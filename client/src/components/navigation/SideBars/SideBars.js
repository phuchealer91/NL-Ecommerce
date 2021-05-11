import React from 'react'
import './SideBar.css'
const SideBar = ({ menu }) => {
  return (
    <div
      className="fixed pb-4 text-gray-500 dark:text-gray-400 overflow-y-auto"
      breakpoint={'lg'}
      theme="light"
      collapsedWidth={0}
      trigger={null}
    >
      {menu}
    </div>
  )
}

export default SideBar
