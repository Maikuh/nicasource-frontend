import {
  Paper,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button
} from '@mui/material'
import { useSetAtom } from 'jotai'
import { useForm } from 'react-hook-form'
import { createVideoAtom } from '../../atoms/videos.atom'

export default function CreateVideoForm (props: any) {
  const { register, handleSubmit } = useForm()
  const createVideo = useSetAtom(createVideoAtom)

  async function onSubmit (data: any) {
    await createVideo(data)
    props.onSubmit()
  }

  return (
    <Paper
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: 400,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 2
      }}
      component='form'
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant='h4' component='h4' sx={{ mb: 2 }}>
        Create Video
      </Typography>

      <TextField label='Title' {...register('title')} />
      <TextField label='Source URL' {...register('srcUrl')} />
      <FormControlLabel
        control={<Checkbox {...register('published')} />}
        label='Published?'
      />

      <Button variant='contained' type='submit'>
        Submit
      </Button>
    </Paper>
  )
}
