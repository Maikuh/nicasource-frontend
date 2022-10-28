import axios from 'axios'
import { atom } from 'jotai'
import { loadable } from 'jotai/utils'

const videosAtom = atom(async get => {
  const { data } = await axios.get('http://localhost:3000/videos')

  return data
})

export const videosAtomLoadable = loadable(videosAtom)
