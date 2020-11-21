import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
export const useCheckAdmin = () => {
  const { user } = useSelector((state) => ({ ...state }))
  const history = useHistory()
  console.log(history)
  console.log(history.location.state)

  if (user && user.token) {
    if (history.location.state && history.location.state.from === 'cart') {
      history.push(history.location.state.from)
    } else {
      if (user && user.role === 'admin') {
        history.push('/admin/dashboard')
      } else {
        history.push('/user/history')
      }
    }
  }
}
