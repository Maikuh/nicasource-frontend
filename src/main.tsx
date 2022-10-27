import { Provider } from 'jotai'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { darkTheme } from './theme'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
