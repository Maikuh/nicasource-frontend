import { UserRole } from '../enums/user-role.enum'
import { Video } from './Video.interface'

export class User {
  id: string
  name: string
  email: string
  role: UserRole
  photoUrl: string
  videos: Video[]
  likes: Video[]
  following: User[]
  followers: User[]
  createdAt: Date
}
