const rootDir = require('../util/path');
const path = require('path');
const p = path.join(rootDir, 'data');
const send = require('koa-send');
const moment = require('moment');

const {readFileAsync, writeFileAsync} = require('../util/asyncFs');

const getToursFromFile = async (path) => {
    try {
        return JSON.parse(await readFileAsync(path));
    } catch (err) {
        return []
    }
};

exports.getIndex = () => async ctx => {
    const p = path.resolve('frontend');
    await send(ctx, 'index.html', {root: p})
};

exports.postAddTour = () => async ctx => {
    moment.locale('ru');
    const payload = ctx.request.body;
    const summerPath = path.join(p, 'summer.json');
    const winterPath = path.join(p, 'winter.json');
    const schedulePath = path.join(p, 'schedule.json');
    const summerTours = await getToursFromFile(summerPath);
    const winterTours = await getToursFromFile(winterPath);
    const finder = name => tour => tour.title === name;
    const winterTour = winterTours.find(finder(payload.name));
    const summerTour = summerTours.find(finder(payload.name));

    ctx.assert(summerTour || winterTour, 400, 'Naebnulos');

    const dates = moment(payload.start).format('DD MMMM') + ' - ' + moment(payload.end).format('DD MMMM');
    const additional = {
        link: summerTour ? `/summer/${summerTour.id}` : `/winter/${winterTour.id}`,
        days: moment(payload.end).diff(moment(payload.start), 'days'),
        price: summerTour ? summerTour.price : winterTour.price,
        dates
    };

    const result = {...payload, ...additional};
    const schedule = await getToursFromFile(schedulePath);
    schedule.push(result);
    writeFileAsync(schedulePath, JSON.stringify(schedule));

    ctx.body = {ok: true}
};
