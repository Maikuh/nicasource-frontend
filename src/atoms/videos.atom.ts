import axios from 'axios'
import { atom } from 'jotai'
import { loadable } from 'jotai/utils'
import { snackbarAtom } from './snackbar.atom'

const videosListAtom = atom<any[] | null>(null)

export const videosAtom = atom(
  async get => {
    const videos = get(videosListAtom)

    if (!videos) {
      const { data } = await axios.get('http://localhost:3000/videos')
      return data
    }

    return videos
  },
  async (get, set, videos) => {
    const { data } = await axios.get('http://localhost:3000/videos')

    set(videosListAtom, data)
  }
)

export const videosAtomLoadable = loadable(videosAtom)

export const createVideoAtom = atom(null, async (get, set, video) => {
  await axios.post('http://localhost:3000/videos', video)

  set(videosAtom)
  set(snackbarAtom, {
    open: true,
    message: 'Video created successfully',
    variant: 'success'
  })
})

const selectedVideoAtom = atom<any | null>(null)

export const videoDetailsAtom = atom(
  get => get(selectedVideoAtom),
  async (get, set, id) => {
    const { data } = await axios.get(`http://localhost:3000/videos/${id}`)

    set(selectedVideoAtom, data)
  }
)
