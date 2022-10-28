import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MovieIcon from '@mui/icons-material/Movie'
import UserAvatar from './UserAvatar'

export default function Navbar () {
  return (
    <AppBar position='relative'>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <MovieIcon sx={{ mr: 2 }} />
          <Typography variant='h6' color='inherit' noWrap>
            Video Creators
          </Typography>
        </Box>
        <UserAvatar />
      </Toolbar>
    </AppBar>
  )
}
