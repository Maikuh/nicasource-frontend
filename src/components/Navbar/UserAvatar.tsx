import { useAtomValue, useSetAtom } from 'jotai'
import { logoutAtom, userAtomLoadable } from '../../atoms/user.atom'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserAvatar () {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const user = useAtomValue(userAtomLoadable)
  const logout = useSetAtom(logoutAtom)
  const navigate = useNavigate()

  function handleAvatarClick (event: React.MouseEvent<HTMLDivElement>) {
    setAnchorEl(event.currentTarget)
  }

  function handleMenuClose () {
    setAnchorEl(null)
  }

  async function onLogout () {
    await logout()
    navigate('/login')
  }

  if (user.state === 'hasData' && user.data)
    return (
      <>
        <Avatar
          component='div'
          onClick={handleAvatarClick}
          src={user.data.photoUrl}
          sx={{ width: 32, height: 32, cursor: 'pointer' }}
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
        />
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={onLogout}>Logout</MenuItem>
        </Menu>
      </>
    )

  return null
}
