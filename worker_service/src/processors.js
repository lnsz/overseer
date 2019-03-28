const { NOTIFY_URL } = require('./queues')
const axios = require('axios')

const processorInitialisers = {
  [NOTIFY_URL]: db => async job => {
    let response = await axios.post(job.data.url, job.data.payload)
    return response.data
  }
};

module.exports = { processorInitialisers }