import { capitalize, Grid, Link, Paper, Typography } from '@mui/material'
import { useAtomValue } from 'jotai'
import { userAtom } from '../atoms/user.atom'
import { AppLink } from '../components/AppLink'

export default function ProfilePage () {
  const user = useAtomValue(userAtom)

  if (!user) return <></>

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant='h3'>My Profile</Typography>

      <Grid
        container
        sx={{
          mt: 2,
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center'
        }}
        rowGap={4}
      >
        <Grid
          item
          sm={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 4
          }}
        >
          <img
            src={user.photoUrl}
            style={{
              borderRadius: '50%'
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant='h5' fontWeight='bold'>
            Name
          </Typography>
          <Typography>{user.name}</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant='h5' fontWeight='bold'>
            Email
          </Typography>
          <Link href={`mailto:${user.email}`}>{user.email}</Link>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant='h5' fontWeight='bold'>
            Role
          </Typography>
          <Typography>{capitalize(user.role)}</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant='h5' fontWeight='bold'>
            Uploaded Videos
          </Typography>
          {user.videos.length ? (
            <ul style={{ textAlign: 'left' }}>
              {user.videos.map(video => (
                <li>
                  <AppLink to={`/videos/${video.id}`}>{video.title}</AppLink>
                </li>
              ))}
            </ul>
          ) : (
            <Typography>No uploaded videos</Typography>
          )}
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant='h5' fontWeight='bold'>
            Liked Videos
          </Typography>
          {user.likes.length ? (
            <ul style={{ textAlign: 'left' }}>
              {user.likes.map(video => (
                <li>
                  <AppLink to={`/videos/${video.id}`}>{video.title}</AppLink>
                </li>
              ))}
            </ul>
          ) : (
            <Typography>No liked videos</Typography>
          )}
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant='h5' fontWeight='bold'>
            Following
          </Typography>
          {user.following.length ? (
            <ul style={{ textAlign: 'left' }}>
              {user.following.map(creator => (
                <Typography component='li'>{creator.name}</Typography>
              ))}
            </ul>
          ) : (
            <Typography>Not following any creators</Typography>
          )}
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant='h5' fontWeight='bold'>
            Followers
          </Typography>
          {user.followers.length ? (
            <ul style={{ textAlign: 'left' }}>
              {user.followers.map(creator => (
                <Typography component='li'>{creator.name}</Typography>
              ))}
            </ul>
          ) : (
            <Typography>No followers</Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  )
}
