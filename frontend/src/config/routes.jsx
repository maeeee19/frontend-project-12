import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import NotFoundPage from '@/pages/NotFoundPage'
import SignupPage from '@/pages/SignupPage'
import ProtectedRoute from '@/components/ProtectedRoute'

export const routes = [
  {
    path: '/',
    element: <ProtectedRoute><HomePage /></ProtectedRoute>,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]
