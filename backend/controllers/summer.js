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
    tours.push(payload);
    writeFileAsync(p, JSON.stringify(tours));

    ctx.body = {ok: true}
};

exports.getIndex = () => async ctx => {
    const p = path.resolve('frontend');
    await send(ctx, 'index.html', {root: p})
};