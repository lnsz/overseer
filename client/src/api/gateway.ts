import axios from 'axios'

const baseURL = `${process.env.VUE_APP_API_URL || 'http://localhost:4001'}/api`

export default () => {
  return axios.create({
    baseURL,
    withCredentials: true
  })
}
