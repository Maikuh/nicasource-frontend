import axios from 'axios'

export function setAxiosBearerTokenHelper (jwt: string | null) {
  axios.defaults.headers.Authorization = jwt ? `Bearer ${jwt}` : null
}
