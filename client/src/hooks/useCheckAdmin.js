import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
export const useCheckAdmin = () => {
  const { user } = useSelector((state) => ({ ...state }))
  const history = useHistory()
  useEffect(() => {
    if (user && user.role === 'admin') {
      history.push('/admin/dashboard')
    } else if (user && user.role === 'user') {
      history.push('/user/history')
    }
  }, [user, history])
}
