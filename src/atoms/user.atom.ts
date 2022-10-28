import axios, { AxiosError } from 'axios'
import { atom, useSetAtom } from 'jotai'
import { atomWithStorage, loadable } from 'jotai/utils'
import { setAxiosBearerTokenHelper } from '../helpers/axios.helpers'
import { snackbarAtom } from './snackbar.atom'

export const userAtom = atom<any | null>(async get => {
  const jwt = get(jwtAtom)
  const jwtExpiryDate = get(persistentJwtExpAtom)

  if (!jwt || (jwtExpiryDate && Math.floor(Date.now() / 1000) > jwtExpiryDate))
    return null

  try {
    const { data } = await axios.get('http://localhost:3000/users/me')

    return data
  } catch (error) {
    const setSnack = useSetAtom(snackbarAtom)

    setSnack({
      open: true,
      message: (error as AxiosError<any>).response?.data.message,
      variant: 'error'
    })

    throw error
  }
})

export const userAtomLoadable = loadable(userAtom)

export const loginAtom = atom(null, async (get, set, creds) => {
  try {
    const { data } = await axios.post(
      'http://localhost:3000/users/login',
      creds
    )

    set(jwtAtom, data)
    set(snackbarAtom, {
      open: true,
      message: 'Successfully logged in',
      variant: 'success'
    })
  } catch (error) {
    set(snackbarAtom, {
      open: true,
      message: (error as AxiosError<any>).response?.data.message,
      variant: 'error'
    })

    throw error
  }
})

export const registerAtom = atom(null, async (get, set, userData) => {
  try {
    const { data } = await axios.post(
      'http://localhost:3000/users/register',
      userData
    )

    set(jwtAtom, data)
    set(snackbarAtom, {
      open: true,
      message: 'Successfully registered',
      variant: 'success'
    })
  } catch (error) {
    set(snackbarAtom, {
      open: true,
      message: (error as AxiosError<any>).response?.data.message,
      variant: 'error'
    })

    throw error
  }
})

export const logoutAtom = atom(null, async (_, set) => {
  set(jwtAtom, null)
  setAxiosBearerTokenHelper(null)
  set(snackbarAtom, {
    open: true,
    message: "You're now logged out",
    variant: 'info'
  })
})

const persistentJwtAtom = atomWithStorage<string | null>('access_token', null)
const persistentJwtExpAtom = atomWithStorage<number | null>(
  'access_token_expiry_date',
  null
)

const jwtAtom = atom(
  get => {
    const jwt = get(persistentJwtAtom)

    setAxiosBearerTokenHelper(jwt)

    return jwt
  },
  (get, set, jwt: any) => {
    set(persistentJwtAtom, jwt ? jwt.token : null)
    set(persistentJwtExpAtom, jwt ? jwt.exp : null)
  }
)
