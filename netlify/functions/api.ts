import { OpenAPIHono } from '@hono/zod-openapi';
import { handle } from '@hono/node-server/vercel';
import { cors } from 'hono/cors';
import { swaggerUI } from '@hono/swagger-ui';
import swapRoutes from '../../routes/swap';
import { Context } from '@netlify/functions';

const app = new OpenAPIHono();
app.use('/*', cors());

// Routes
app.route('/api/swap', swapRoutes);

app.doc('/doc', {
  info: {
    title: 'Multi-Token Swap API',
    version: 'v1',
  },
  openapi: '3.1.0',
});

app.get(
  '/swagger-ui',
  swaggerUI({
    url: '/doc',
  }),
);

export const handler = async (event: Context) => {
  const res = await app.fetch(event.rawUrl, {
    method: event.httpMethod,
    headers: event.headers as HeadersInit,
    body: event.body,
  });

  return {
    statusCode: res.status,
    headers: Object.fromEntries(res.headers.entries()),
    body: await res.text(),
  };
};