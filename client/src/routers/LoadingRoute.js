import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import GlobalLoading from '../components/GlobalLoading/GlobalLoading'

const LoadingRoute = () => {
  const [count, setCount] = useState(5)
  let history = useHistory()

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount)
    }, 1000)
    // redirect once count is equal to 0
    count === 0 && history.push('/')
    // cleanup
    return () => clearInterval(interval)
  }, [count, history])

  return <GlobalLoading />
}

export default LoadingRoute
