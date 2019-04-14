import { queues } from './queues.mjs'
import { processorInitialisers } from './processors.mjs' 
import db from './db'

Object.entries(queues).forEach(([queueName, queue]) => {
  console.log(`Worker listening to '${queueName}' queue`)
  queue.process(processorInitialisers[queueName](db))
})