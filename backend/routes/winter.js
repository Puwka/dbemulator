const Router = require('koa-router');

const {
    postAddTour,
    getIndex
} = require('../controllers/winter');

module.exports = Router()
    .prefix('/winter')
    .get('/', getIndex())
    .post('/addTour', postAddTour());

