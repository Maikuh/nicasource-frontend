import { createBrowserRouter } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import VideosPage from './pages/VideosPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <VideosPage />,
    children: [{ path: '/videos', element: <VideosPage /> }]
  },
  {
    path: '/register',
    element: <RegisterPage />
  }
])
