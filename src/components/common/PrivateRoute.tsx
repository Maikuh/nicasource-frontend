import { Typography } from '@mui/material'
import { useAtom } from 'jotai'
import React from 'react'
import { Navigate } from 'react-router-dom'
import { userAtomLoadable } from '../../atoms/user.atom'

export default function PrivateRoute ({
  component,
  ...props
}: React.PropsWithChildren & {
  component: JSX.Element
}) {
  const [user] = useAtom(userAtomLoadable)

  if (user.state === 'hasError') return <Navigate to='/login' />

  if (user.state === 'loading') return <Typography>Loading...</Typography>

  if (!user.data) return <Navigate to='/login' />

  return <>{component}</>
}
