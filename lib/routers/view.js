const Router = require('koa-router');
const router = new Router();

const home = require('./view/home');
router.use('/home', home.routes(), home.allowedMethods());

module.exports = router;
