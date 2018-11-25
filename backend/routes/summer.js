const Router = require('koa-router');

const {
    postAddTour,
    getIndex
} = require('../controllers/summer');

module.exports = Router()
    .prefix('/summer')
    .get('/', getIndex())
    .post('/addTour', postAddTour());

