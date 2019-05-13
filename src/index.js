import Koa from 'koa';
import dotenv from 'dotenv';

import { routes, allowedMethods } from './routes/users';

const app = new Koa();
dotenv.config();
const port = process.env.PORT;

app.use(routes());
app.use(allowedMethods());

app.listen(port, () => {
  console.log(`Server started (Port: ${port})`);
});
