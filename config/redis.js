import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
  // username: process.env.REDIS_NAME,
  // password: process.env.REDIS_SECRET,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  // legacyMode: true,
});

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

export { client };
