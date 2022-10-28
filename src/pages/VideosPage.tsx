import { Grid, Typography } from '@mui/material'
import { useAtom } from 'jotai'
import { videosAtomLoadable } from '../atoms/videos.atom'
import VideoCard from '../components/Videos/VideoCard'

export default function VideosPage () {
  const [videos] = useAtom(videosAtomLoadable)

  if (videos.state === 'hasError')
    return <Typography>An error ocurred fetching videos</Typography>

  if (videos.state === 'loading') return <Typography>Loading...</Typography>

  return (
    <Grid container spacing={2}>
      {videos.data.map(video => (
        <Grid item xs={12} sm={6} md={4} key={video.id} zeroMinWidth>
          <VideoCard
            title={video.title}
            createdAt={video.createdAt}
            creatorId={video.creator.id}
            creatorPhotoUrl={video.creator.photoUrl}
            videoSrcUrl={video.srcUrl}
            videoId={video.srcUrl.split('watch?v=')[1]}
          />
        </Grid>
      ))}
    </Grid>
  )
}
