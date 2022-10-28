import axios from "axios";
import { client } from "../api/client";

export function setAxiosBearerTokenHelper (jwt: string | null) {
  client.defaults.headers.Authorization = jwt ? `Bearer ${jwt}` : null
  axios.defaults.headers.Authorization = jwt ? `Bearer ${jwt}` : null
}
