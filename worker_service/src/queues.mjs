import Queue from 'bull'

const NOTIFY_URL = 'NOTIFY_URL'

const queues = {
  [NOTIFY_URL]: new Queue(
    NOTIFY_URL,
    {
      redis: {
        host: process.env.DATABASE_NAME
      }
    }
  )
}

export {
  NOTIFY_URL,
  queues
}