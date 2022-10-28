import { Typography } from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import {
  jwtAtom,
  persistentJwtExpAtom,
  userAtom,
  userAtomLoadable
} from '../../atoms/user.atom'

export default function PrivateRoute ({
  component
}: React.PropsWithChildren & {
  component: JSX.Element
}) {
  const jwt = useAtomValue(jwtAtom)
  const jwtExpiryDate = useAtomValue(persistentJwtExpAtom)
  const [user, fetchUser] = useAtom(userAtom)
  const isJwtExpired =
    jwtExpiryDate && Math.floor(Date.now() / 1000) > jwtExpiryDate

  useEffect(() => {
    if (jwt) fetchUser()
  }, [])

  if (!jwt || isJwtExpired) return <Navigate to='/login' />

  if (!user) return <Typography>Loading...</Typography>

  return <>{component}</>
}
