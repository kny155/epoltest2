import Koa from 'koa';
import dotenv from 'dotenv';

import { connectDb } from './model';
import { routes, allowedMethods } from './routes/routes';

connectDb();
dotenv.config();

const app = new Koa();
const port = process.env.PORT;

app.use(routes());
app.use(allowedMethods());

app.listen(port, () => {
  console.log(`Server started (Port: ${port})`);
});
