const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

const summerRoutes = require('./routes/summer');

const app = new Koa();

app.use(bodyParser())
    .use(cors({
        origin: '*'
    }))
    .use(summerRoutes.routes());

app.listen('3005', () => console.log('backend listening on port 3005'));