const rootDir = require('../util/path');
const path = require('path');
const p = path.join(rootDir, 'data', 'summer.json');
const send = require('koa-send');

const {
    readFileAsync,
    writeFileAsync
} = require('../util/asyncFs');

const getToursFromFile = async () => {
    try {
        return JSON.parse(await readFileAsync(p));
    } catch (err) {
        return []
    }
};

exports.postAddTour = () => async ctx => {
    const payload = ctx.request.body;
    console.log(payload)
    const tours = await getToursFromFile();
    const {
        title
    } = (tours.find(t => t.title === payload.title) || {});
    const {
        id
    } = (tours.find(t => t.id === payload.id) || {});
    console.log(title, id)
    ctx.assert(title !== payload.title, 400, 'тур');
    ctx.assert(id !== payload.id, 400, 'ссылка');
    tours.push(payload);
    writeFileAsync(p, JSON.stringify(tours));

    ctx.body = {
        ok: true
    }
};

exports.getIndex = () => async ctx => {
    const p = path.resolve('frontend');
    await send(ctx, 'index.html', {
        root: p
    })
};