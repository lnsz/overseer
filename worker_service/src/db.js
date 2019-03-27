const Redis = require('ioredis');
const uuidV4 = require('uuid');

const redis = new Redis({
  host: process.env.DATABASE_URL.split(':')[0]
});

const WEBHOOK_PREFIX = 'webhook:';
const PAYLOAD_PREFIX = `${WEBHOOK_PREFIX}payload:`;
const URLS_PREFIX = `${WEBHOOK_PREFIX}urls:`;

const makePayloadKey = id => `${PAYLOAD_PREFIX}${id}`;
const makeUrlsKey = id => `${URLS_PREFIX}${id}`;

async function setWebhook(payload, urls) {
  const id = uuidV4();
  const transaction = redis.multi()
    .hmset(makePayloadKey(id), payload)
    .lpush(makeUrlsKey(id), urls)
  await transaction.exec();
  return id;
}

async function getWebhook(id) {
  const transaction = redis.multi()
    .hgetall(makePayloadKey(id))
    .lrange(makeUrlsKey(id), 0, -1);
  const [[_, payload], [__, urls]] = await transaction.exec();
  return {
    payload,
    urls
  };
}

const db = { setWebhook, getWebhook }

module.exports = { setWebhook, getWebhook }