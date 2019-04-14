import express from 'express'
import url from 'url'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import Arena from 'bull-arena'
import { queues, NOTIFY_URL } from './queues.mjs'
import db from './db'

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const getRedisConfig = (redisUrl) => {
  const redisConfig = url.parse(redisUrl)
  return {
    host: redisConfig.hostname || 'localhost',
  }
}

app.use('/', Arena(
  {
    queues: [
      {
        name: NOTIFY_URL,
        hostId: 'Worker',
        redis: getRedisConfig(`redis://${process.env.DATABASE_NAME}:${process.env.DATABASE_PORT}`)
      }
    ]
  }
))

app.post('/webhooks', async (req, res, next) => {
  const { payload, urls } = req.body
  try {
    const id = await db.setWebhook(payload, urls)
    return res.json({
      id
    })
  } catch (error) {
    next(error)
  }
})

app.post('/webhooks/notify', async (req, res, next) => {
  const { id } = req.body
  try {
    const { payload, urls } = await db.getWebhook(id)
    urls.forEach(url => {
      queues[NOTIFY_URL].add({
        payload,
        url,
        id
      })
    })
    return res.status(200).send()
  } catch (error) {
    next(error)
  }
})

app.post('/example', (req, res) => {
  console.log(`Hit example with ${JSON.stringify(req.body)}`)
  return res.status(200).send({ success: true })
})

app.post('/example2', (req, res) => {
  console.log(`Hit example2 with ${JSON.stringify(req.body)}`)
  return res.status(200).send({ success: false })
})

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server running on ${process.env.SERVICE_URL}`)
})