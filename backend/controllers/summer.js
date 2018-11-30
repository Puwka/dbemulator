const rootDir = require('../util/path');
const path = require('path');
const p = path.join(rootDir, 'data', 'summer.json');
const send = require('koa-send');

const {readFileAsync, writeFileAsync} = require('../util/asyncFs');

const getToursFromFile = async () => {
    try {
        return JSON.parse(await readFileAsync(p));
    } catch (err) {
        return []
    }
};

exports.postAddTour = () => async ctx => {
    const payload = ctx.request.body;
    const tours = await getToursFromFile();
    const {link, id} = tours.find(t => t.link === payload.link);
    ctx.assert(link !== payload.link, 400, {message: 'Ссылка занята', link});
    ctx.assert(id !== payload.id, 400, {message: 'Такой тур уже есть', id});
    tours.push(payload);
    writeFileAsync(p, JSON.stringify(tours));

    ctx.body = {ok: true}
};

exports.getIndex = () => async ctx => {
    const p = path.resolve('frontend');
    await send(ctx, 'index.html', {root: p})
};