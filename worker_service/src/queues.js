const Queue = require('bull');

const NOTIFY_URL = 'NOTIFY_URL';

const queues = {
  [NOTIFY_URL]: new Queue(
    NOTIFY_URL,
    `redis://${process.env.DATABASE_URL}`
  )
};

module.exports = { NOTIFY_URL, queues }