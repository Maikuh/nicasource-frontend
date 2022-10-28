import { capitalize, Grid, Link, Paper, Typography } from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import { userAtomLoadable } from '../atoms/user.atom'
import { AppLink } from '../components/AppLink'

export default function ProfilePage () {
  const user = useAtomValue(userAtomLoadable)

  if (user.state === 'hasError')
    return <Typography>An error occurred while loading your profile</Typography>

  if (user.state === 'loading') return <Typography>Loading...</Typography>

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
          md={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 4
          }}
        >
          <img
            src={user.data.photoUrl}
            style={{
              borderRadius: '50%'
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant='h5' fontWeight='bold'>
            Name
          </Typography>
          <Typography>{user.data.name}</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant='h5' fontWeight='bold'>
            Email
          </Typography>
          <Link href={`mailto:${user.data.email}`}>{user.data.email}</Link>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant='h5' fontWeight='bold'>
            Role
          </Typography>
          <Typography>{capitalize(user.data.role)}</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant='h5' fontWeight='bold'>
            Uploaded Videos
          </Typography>
          {user.data.videos.length ? (
            <ul style={{ textAlign: 'left' }}>
              {user.data.videos.map(video => (
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
          {user.data.likes.length ? (
            <ul style={{ textAlign: 'left' }}>
              {user.data.likes.map(video => (
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
          {user.data.following.length ? (
            <ul style={{ textAlign: 'left' }}>
              {user.data.following.map(creator => (
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
          {user.data.followers.length ? (
            <ul style={{ textAlign: 'left' }}>
              {user.data.followers.map(creator => (
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
