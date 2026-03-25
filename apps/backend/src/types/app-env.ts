import type { Logger } from 'pino';

export interface AppEnv {
  Variables: {
    logger: Logger;
    // 'token-decoded': TokenDecoded;
  };
}
