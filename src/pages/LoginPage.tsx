import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { AppLink } from '../components/AppLink'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useSetAtom } from 'jotai'
import { loginAtom } from '../atoms/user.atom'
import { useNavigate } from 'react-router-dom'

function Copyright (props: any) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='https://github.com/Maikuh'>
        Miguel Araujo
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default function LoginPage () {
  const { register, handleSubmit } = useForm()
  const login = useSetAtom(loginAtom)
  const navigate = useNavigate()

  async function onSubmit (data: any) {
    await login(data)
    navigate('/')
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <Box
          component='form'
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...register('email')}
                required
                fullWidth
                label='Email Address'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('password')}
                required
                fullWidth
                label='Password'
                type='password'
                autoComplete='new-password'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <AppLink to='/register'>
                Don't have an account yet? Register
              </AppLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  )
}
