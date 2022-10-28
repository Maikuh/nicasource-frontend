import { Typography } from '@mui/material'
import { useAtomValue } from 'jotai'
import React from 'react'
import { Navigate } from 'react-router-dom'
import { userAtomLoadable } from '../../atoms/user.atom'

export default function PrivateRoute ({
  component
}: React.PropsWithChildren & {
  component: JSX.Element
}) {
  const user = useAtomValue(userAtomLoadable)

  if (user.state === 'hasError') return <Navigate to='/login' />

  if (user.state === 'loading') return <Typography>Loading...</Typography>

  if (!user.data) return <Navigate to='/login' />

  return <>{component}</>
}
