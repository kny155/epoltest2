import Koa from 'koa';
import passport from 'passport';
import dotenv from 'dotenv';
import * as swagger from 'swagger2';
import { ui, validate } from 'swagger2-koa';
import bodyParser from 'koa-bodyparser';

import confPass from './config/password';
import { connectDb } from './model';
import { routes, allowedMethods } from './routes/routes';

connectDb();
dotenv.config();
confPass(passport);

const app = new Koa();
const port = process.env.PORT;
const document = swagger.loadDocumentSync('./swagger.yml');

app.use(ui(document, '/api'));
app.use(bodyParser());
app.use(validate(document));
app.use(routes());
app.use(allowedMethods());

app.listen(port, () => {
	console.log(`Server started (Port: ${port})`);
});
