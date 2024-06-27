
import { OpenAPIHono } from '@hono/zod-openapi';
import { handle } from '@hono/node-server/vercel';
import { cors } from 'hono/cors';
import { swaggerUI } from '@hono/swagger-ui';
import swapRoutes from '../routes/swap';

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

export default handle(app);