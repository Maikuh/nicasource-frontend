import axios, { AxiosError } from 'axios'
import { atom } from 'jotai'
import { atomWithStorage, loadable } from 'jotai/utils'
import { client } from '../api/client'
import { setAxiosBearerTokenHelper } from '../helpers/axios.helpers'
import { User } from '../types/User.interface'
import { snackbarAtom } from './snackbar.atom'

const currentUserAtom = atom<User | null>(null)

export const userAtom = atom(
  get => get(currentUserAtom),
  async (get, set, update: User | undefined) => {
    const jwt = get(jwtAtom)
    const jwtExpiryDate = get(persistentJwtExpAtom)
    const isJwtExpired =
      jwtExpiryDate && Math.floor(Date.now() / 1000) > jwtExpiryDate

    if (!jwt || isJwtExpired) {
      set(currentUserAtom, null)
      set(jwtAtom, null)
      return
    }

    try {
      const { data } = await client.get<User>('/users/me')

      set(currentUserAtom, data)
    } catch (error) {
      set(snackbarAtom, {
        open: true,
        message: (error as AxiosError<any>).response?.data.message,
        variant: 'error'
      })

      throw error
    }
  }
)

export const userAtomLoadable = loadable(userAtom)

export const loginAtom = atom(null, async (get, set, creds) => {
  try {
    const { data } = await client.post('/users/login', creds)

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
    const { data } = await axios.post('/users/register', userData)

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
export const persistentJwtExpAtom = atomWithStorage<number | null>(
  'access_token_expiry_date',
  null
)

export const jwtAtom = atom(
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
