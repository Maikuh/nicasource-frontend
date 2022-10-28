import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MovieIcon from '@mui/icons-material/Movie'
import UserAvatar from './UserAvatar'
import { AppLink } from '../AppLink'

export default function Navbar () {
  return (
    <AppBar position='relative'>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <MovieIcon sx={{ mr: 2 }} />
          <Typography
            variant='h6'
            color='inherit'
            noWrap
            component={AppLink}
            to='/'
            sx={{ textDecoration: 'none' }}
          >
            Video Creators
          </Typography>
        </Box>
        <UserAvatar />
      </Toolbar>
    </AppBar>
  )
}
