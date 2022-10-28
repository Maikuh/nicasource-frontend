import { AlertColor } from '@mui/material'
import { atom } from 'jotai'

class SnackProps {
  message?: string = ''
  variant?: AlertColor = 'info'
  open = false
}

export const snackbarAtom = atom<SnackProps>({
  // message: '',
  // variant: 'info',
  open: false
})
