const Queue = require('bull');

const NOTIFY_URL = 'NOTIFY_URL';

const queues = {
  [NOTIFY_URL]: new Queue(
    NOTIFY_URL,
    {
      redis: {
        host: process.env.DATABASE_URL.split(':')[0]
      }
    }
  )
};

module.exports = { NOTIFY_URL, queues }