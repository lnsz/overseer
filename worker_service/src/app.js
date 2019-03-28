const express = require('express')
const url = require('url')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const Arena = require('bull-arena')
const { queues, NOTIFY_URL } = require('./queues')
const { setWebhook, getWebhook } = require('./db')

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
  const { payload, urls } = req.body;
  try {
    const id = await setWebhook(payload, urls);
    return res.json({
      id
    });
  } catch (error) {
    next(error);
  }
});

app.post('/webhooks/notify', async (req, res, next) => {
  const { id } = req.body;
  try {
    const { payload, urls } = await getWebhook(id);
    console.log(payload, urls)
    urls.forEach(url => {
      queues[NOTIFY_URL].add({
        payload,
        url,
        id
      });
    });
    return res.status(200).send();
  } catch (error) {
    next(error);
  }
});

app.post('/example', (req, res) => {
  console.log(`Hit example with ${JSON.stringify(req.body)}`);
  return res.status(200).send({ success: true });
});

app.post('/example2', (req, res) => {
  console.log(`Hit example2 with ${JSON.stringify(req.body)}`);
  return res.status(200).send({ success: false });
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server running on ${process.env.SERVICE_URL}`)
})