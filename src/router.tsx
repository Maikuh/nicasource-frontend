import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import PrivateRoute from './components/common/PrivateRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import VideosPage from './pages/VideosPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <PrivateRoute component={<VideosPage />} />
      },
      {
        path: '/videos',
        element: <PrivateRoute component={<VideosPage />} />
      }
    ]
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  }
])
