const { queues } = require('./queues')
const { processorInitialisers } = require('./processors')
const { setWebhook, getWebhook } = require('./db')
const db = { setWebhook, getWebhook }

Object.entries(queues).forEach(([queueName, queue]) => {
  console.log(`Worker listening to '${queueName}' queue`);
  queue.process(processorInitialisers[queueName](db));
});