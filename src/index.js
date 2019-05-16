import Koa from 'koa';
import passport from 'passport';
import * as swagger from 'swagger2';
import { ui, validate } from 'swagger2-koa';
import bodyParser from 'koa-bodyparser';

import confPass from './config/password';
import { connectDb } from './model';
import { routes, allowedMethods } from './routes/routes';
import {PORT} from '../config.json'

connectDb();
confPass(passport);

const app = new Koa();
const document = swagger.loadDocumentSync('./swagger.yml');

app.use(ui(document, '/api'));
app.use(bodyParser());
app.use(validate(document));
app.use(routes());
app.use(allowedMethods());

app.listen(PORT, () => {
	console.log(`Server started (Port: ${PORT})`);
});
