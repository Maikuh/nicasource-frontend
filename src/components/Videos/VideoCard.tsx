import ThumbUp from '@mui/icons-material/ThumbUp'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardActions,
  Button
} from '@mui/material'
import { red } from '@mui/material/colors'
import { useAtomValue } from 'jotai'
import { userAtom } from '../../atoms/user.atom'
import InfoIcon from '@mui/icons-material/InfoOutlined'
import { useNavigate } from 'react-router-dom'

export default function VideoCard ({
  title,
  creatorPhotoUrl,
  createdAt,
  videoSrcUrl,
  creatorId,
  videoId
}: any) {
  const user = useAtomValue(userAtom)
  const navigate = useNavigate()
  const videoUrlId = videoSrcUrl.split('watch?v=')[1]
  const isFollowingCreator =
    user.following.findIndex(creator => creator.id === creatorId) > 0

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label='recipe'
            src={creatorPhotoUrl}
          >
            R
          </Avatar>
        }
        action={
          <Button
            variant='outlined'
            color={isFollowingCreator ? 'error' : 'primary'}
            size='small'
          >
            {isFollowingCreator ? 'Unfollow' : 'Follow'}
          </Button>
        }
        title={title}
        subheader={new Date(createdAt).toLocaleDateString()}
        titleTypographyProps={{
          noWrap: true,
          maxWidth: 164
        }}
      />
      <CardMedia
        component='img'
        height='194'
        image={`https://img.youtube.com/vi/${videoUrlId}/hqdefault.jpg`}
      />

      <CardActions disableSpacing>
        <IconButton aria-label='like video'>
          <ThumbUp
            htmlColor={
              user.likes.findIndex(like => like.srcUrl.includes(videoUrlId)) !==
              -1
                ? 'dodgerblue'
                : 'inherit'
            }
          />
        </IconButton>
        <IconButton onClick={() => navigate(`/videos/${videoId}`)}>
          <InfoIcon />
        </IconButton>
        <IconButton aria-label='share' href={videoSrcUrl} target='_blank'>
          <OpenInNewIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}
