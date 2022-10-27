import { Link } from '@mui/material'
import React from 'react'
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps
} from 'react-router-dom'

// eslint-disable-next-line react/display-name
const LinkBehavior = React.forwardRef<any, RouterLinkProps>((props, ref) => (
  <RouterLink ref={ref} {...props} />
))

export const AppLink = ({
  children,
  ...props
}: React.PropsWithChildren<RouterLinkProps>) => (
  <Link component={LinkBehavior} {...props}>
    {children}
  </Link>
)
