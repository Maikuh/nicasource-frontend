import {
  Box,
  Button,
  Grid,
  IconButton,
  Link,
  Paper,
  Typography
} from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { videoDetailsAtom } from '../atoms/videos.atom'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { userAtom } from '../atoms/user.atom'

export default function VideoDetailsPage () {
  const { id } = useParams()
  const [details, fetchDetails] = useAtom(videoDetailsAtom)
  const currentUser = useAtomValue(userAtom)

  useEffect(() => {
    if (!details) fetchDetails(id)
  })

  if (!details) return <Typography>Loading...</Typography>

  const isFollowingCreator =
    currentUser.following.findIndex(
      creator => creator.id === details.creator.id
    ) > 0
  const videoUrlId = details.srcUrl.split('watch?v=')[1]

  return (
    <Paper elevation={2} sx={{ p: 4 }}>
      <Typography variant='h3' sx={{ mb: 4 }}>
        Video Details
      </Typography>

      <Grid container rowGap={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant='h5'>Title</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography>{details.title}</Typography>
            <IconButton
              color={
                details.likedBy.findIndex(user => user.id === currentUser.id) >
                0
                  ? 'info'
                  : 'inherit'
              }
            >
              <ThumbUpIcon />
            </IconButton>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant='h5'>Likes</Typography>
          <Typography>{details.likedBy.length}</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant='h5'>Creation Date</Typography>
          <Typography>
            {new Date(details.createdAt).toLocaleDateString()}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant='h5'>Created By</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography>{details.creator.name}</Typography>
            <Button color={isFollowingCreator ? 'error' : 'info'}>
              {isFollowingCreator ? 'Unfollow' : 'Follow'}
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant='h6'>Is Published</Typography>
          {details.published ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant='h6'>Video URL</Typography>
          <Link href={details.srcUrl} target='_blank'>
            {details.srcUrl}
          </Link>
        </Grid>

        <Grid item xs={12}>
          <Typography variant='h6'>Video Thumbnail (Youtube)</Typography>
          <img
            style={{ maxWidth: '100%', height: 'auto' }}
            src={`https://img.youtube.com/vi/${videoUrlId}/hqdefault.jpg`}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}
