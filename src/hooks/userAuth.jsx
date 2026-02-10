import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function useRequireAuth () {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      localStorage.setItem(
        'redirect_after_login',
        location.pathname + location.search
      )

      navigate('/login', { replace: true })
    }
  }, [navigate, location.pathname, location.search])
}
