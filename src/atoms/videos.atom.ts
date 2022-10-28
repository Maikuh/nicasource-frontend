import { atom } from 'jotai'
import { loadable } from 'jotai/utils'
import { client } from '../api/client'
import { Video } from '../types/Video.interface'
import { snackbarAtom } from './snackbar.atom'

const videosListAtom = atom<Video[] | null>(null)

export const videosAtom = atom(
  async get => {
    const videos = get(videosListAtom)

    if (!videos) {
      const { data } = await client.get<Video[]>('/videos')
      return data
    }

    return videos
  },
  async (get, set, videos) => {
    const { data } = await client.get('/videos')

    set(videosListAtom, data)
  }
)

export const videosAtomLoadable = loadable(videosAtom)

export const createVideoAtom = atom(null, async (get, set, video) => {
  await client.post('/videos', video)

  set(videosAtom)
  set(snackbarAtom, {
    open: true,
    message: 'Video created successfully',
    variant: 'success'
  })
})

const selectedVideoAtom = atom<Video | null>(null)

export const videoDetailsAtom = atom(
  get => get(selectedVideoAtom),
  async (get, set, id) => {
    const { data } = await client.get(`/videos/${id}`)

    set(selectedVideoAtom, data)
  }
)
