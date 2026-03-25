import type { ApiRouteType } from '@backend/server/types';

import { hc } from 'hono/client';

const client = hc<ApiRouteType>('/');

const api = client.api;

export default api;
