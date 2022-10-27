import axios from 'axios'
import { atom } from 'jotai'
import { atomWithStorage, loadable } from 'jotai/utils'

export const userAtom = atom<any | null>(async get => {
  const jwt = get(jwtAtom)

  if (!jwt) return null

  const { data } = await axios.get('http://localhost:3000/users/me')

  return data
})

export const userAtomLoadable = loadable(userAtom)

export const loginAtom = atom(null, async (get, set, creds) => {
  const { data } = await axios.post('http://localhost:3000/users/login', creds)

  set(jwtAtom, data.access_token)
})

export const registerAtom = atom(null, async (get, set, userData) => {
  const { data } = await axios.post(
    'http://localhost:3000/users/register',
    userData
  )

  set(jwtAtom, data.access_token)
})

const persistenceJwtAtom = atomWithStorage<string | null>('access_token', null)

const jwtAtom = atom(
  get => get(persistenceJwtAtom),
  (get, set, jwt: string) => {
    set(persistenceJwtAtom, jwt)

    axios.defaults.headers.Authorization = `Bearer ${jwt}`
  }
)
