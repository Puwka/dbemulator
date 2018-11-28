const Router = require('koa-router');

const {
    getIndex,
    postAddTour
} = require('../controllers/schedule');

module.exports = Router()
    .prefix('/schedule')
    .post('/addTour', postAddTour())
    .get('/', getIndex());

