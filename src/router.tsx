import axios from 'axios'
import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import PrivateRoute from './components/common/PrivateRoute'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import RegisterPage from './pages/RegisterPage'
import VideoDetailsPage from './pages/VideoDetailsPage'
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
      },
      {
        path: '/videos/:id',
        element: <PrivateRoute component={<VideoDetailsPage />} />
      },
      {
        path: 'profile',
        element: <PrivateRoute component={<ProfilePage />} />
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
