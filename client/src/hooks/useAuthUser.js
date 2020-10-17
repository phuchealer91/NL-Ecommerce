import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
export const useAuthUser = (pathRedirect = '/') => {
  const { user } = useSelector((state) => ({ ...state }))
  const history = useHistory()

  useEffect(() => {
    if (user && user.token) {
      history.push(pathRedirect)
    }
  }, [user, history, pathRedirect])
}
