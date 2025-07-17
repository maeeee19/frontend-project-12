import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInitAuth } from '@/hooks/useAuth'

const ProtectedRoute = ({ children }) => {
  const { token } = useInitAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token, navigate])

  return children
}

export default ProtectedRoute
