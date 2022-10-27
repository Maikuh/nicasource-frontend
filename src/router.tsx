import { createBrowserRouter } from 'react-router-dom'
import PrivateRoute from './components/common/PrivateRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import VideosPage from './pages/VideosPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute component={VideosPage} />,
    children: [
      { path: '/videos', element: <PrivateRoute component={VideosPage} /> }
    ]
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
])
