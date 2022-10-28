import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import { useAtom } from 'jotai'
import { videosAtomLoadable } from '../atoms/videos.atom'
import VideoCard from '../components/Videos/VideoCard'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import CreateVideoForm from '../components/Videos/CreateVideoForm'

export default function VideosPage () {
  const [videos] = useAtom(videosAtomLoadable)
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  if (videos.state === 'hasError')
    return <Typography>An error ocurred fetching videos</Typography>

  if (videos.state === 'loading') return <Typography>Loading...</Typography>

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Button
        variant='outlined'
        size='large'
        startIcon={<AddIcon />}
        sx={{ mb: 4, mt: 2 }}
        onClick={handleOpenModal}
      >
        Create Video
      </Button>

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

      <Modal open={openModal} onClose={handleCloseModal} disableEnforceFocus>
        <CreateVideoForm onSubmit={handleCloseModal} />
      </Modal>
    </Box>
  )
}
