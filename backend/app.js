const path = require('path');

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const serve = require('koa-static');

const summerRoutes = require('./routes/summer');

const app = new Koa();
// console.log(path.join(__dirname, 'frontend'))
app.use(bodyParser())
    .use(serve(path.join(__dirname, '..', '/frontend')))
    .use(cors({
        origin: '*'
    }))
    .use(summerRoutes.routes());

app.listen('3005', () => console.log('backend listening on port 3005'));