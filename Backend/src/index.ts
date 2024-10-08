import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Todo } from './routes/Todo';
import { cors } from 'hono/cors';
import { User } from './routes/User';
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string
	}
}>();
app.use('*', cors());
app.route('/api/v2/',Todo);
app.route('/api/v2/',User);

export default app
