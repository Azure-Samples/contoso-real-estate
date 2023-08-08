import fp from 'fastify-plugin';
import { v4 as uuidv4 } from 'uuid';

const indexTimeInterval = 60 * 60 * 1000; // 1h

export default fp(async (fastify) => {
  const runIndexer = async () => {
    try {
      const port = 3000;
      await fetch(`http://127.0.0.1:${port}/index?user=${uuidv4()}`)
    } catch (_error: unknown) {
      const error = _error as Error;
      fastify.log.error(`Error while running indexer: ${error.message}`)
    }
  }

  setInterval(runIndexer, indexTimeInterval);
}, {
  name: 'scheduler',
  dependencies: ['config'],
});
