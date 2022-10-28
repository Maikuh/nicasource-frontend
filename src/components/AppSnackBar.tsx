import Alert, { AlertColor } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useAtom, useSetAtom } from 'jotai'
import { useState } from 'react'
import { snackbarAtom } from '../atoms/snackbar.atom'

interface IAppSnackBarProps {
  autoHideDuration?: number
}

export default function AppSnackBar ({
  autoHideDuration = 5000
}: IAppSnackBarProps) {
  const [snack, setSnack] = useAtom(snackbarAtom)

  function handleClose (event?: React.SyntheticEvent | Event, reason?: string) {
    if (reason === 'clickaway') {
      return
    }

    setSnack({ open: false })
  }

  return (
    <Snackbar
      key={Date.now()}
      open={snack.open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={snack.variant}
        sx={{ width: '100%' }}
        variant='filled'
        elevation={6}
      >
        {snack.message}
      </Alert>
    </Snackbar>
  )
}
