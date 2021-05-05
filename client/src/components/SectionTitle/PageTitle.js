import React from 'react'

function PageTitle({ children }) {
  return (
    <h1 className="my-4 text-lg font-semibold text-gray-700 dark:text-gray-200">
      {children}
    </h1>
  )
}

export default PageTitle
