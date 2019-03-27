const express = require('express')
const url = require('url')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const Arena = require('bull-arena')
const { queues, NOTIFY_URL } = require('./queues')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const getRedisConfig = (redisUrl) => {
  const redisConfig = url.parse(redisUrl)
  return {
    host: redisConfig.hostname || 'localhost',
    port: Number(redisConfig.port || 6379),
    database: (redisConfig.pathname || '/0').substr(1) || '0',
    password: redisConfig.auth ? redisConfig.auth.split(':')[1] : undefined
  }
}

app.use('/', Arena(
  {
    queues: [
      {
        name: NOTIFY_URL,
        hostId: 'Worker',
        redis: getRedisConfig(`redis://${process.env.DATABASE_URL}`)
      }
    ]
  }
))

app.post('/webhooks', (req, res, next) => {
  const { payload, urls } = req.body;
  res.json({
    payload,
    urls
  });
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server running on ${process.env.SERVICE_URL}`)
})