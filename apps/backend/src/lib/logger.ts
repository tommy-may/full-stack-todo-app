import pino from 'pino';

import { LOG_LEVEL, NODE_ENV } from '@/env';

const transport: Record<typeof NODE_ENV, pino.TransportTargetOptions | undefined> = {
  production: undefined,
  development: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
    },
  },
};

const logger = pino({
  level: LOG_LEVEL,
  errorKey: 'error',
  nestedKey: 'payload',
  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      'req.headers.set-cookie',
      'req.body.password',
      'res.headers.set-cookie',
    ],
    remove: true,
  },
  transport: transport[NODE_ENV],
});

export default logger;
