import { Container } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'

export default function App () {
  return (
    <>
      <Navbar />
      <Container sx={{ my: 4 }}>
        <Outlet />
      </Container>
    </>
  )
}
