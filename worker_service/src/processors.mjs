import { NOTIFY_URL } from './queues.mjs'
import axios from 'axios'

export const processorInitialisers = {
  [NOTIFY_URL]: db => async job => {
    let response = await axios.post(job.data.url, job.data.payload)
    return response.data
  }
}