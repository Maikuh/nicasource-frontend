import { User } from './User.interface'

export class Video {
  id: string
  title: string
  published: boolean = false
  srcUrl: string
  creator: User
  likedBy: User[]
  createdAt: Date
  updatedAt: Date
}
