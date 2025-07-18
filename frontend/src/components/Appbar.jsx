import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { selectAuth } from '@/store/authSlice'
import { useLogout } from '@/hooks/useAuth'

const Appbar = () => {
  const { t } = useTranslation()
  const { token, username } = useSelector(selectAuth)
  const handleLogout = useLogout()

  return (
    <Navbar className="bg-gray-100 border-bottom">
      <div className="container">
        <Navbar.Brand as="a" href="/">Hexlet Chat</Navbar.Brand>
        {token && (
          <div className="d-flex align-items-center gap-3">
            <span className="text-muted">{t('auth.greeting', { username })}</span>
            <Button variant="outline-primary" onClick={handleLogout}>{t('auth.logout')}</Button>
          </div>
        )}
      </div>
    </Navbar>
  )
}

export default Appbar
