const Router = require('koa-router');
const router = new Router();

const home = require('./view/home');
const chat = require('./view/chat');
router.use('/home', home.routes(), home.allowedMethods());
router.use('/chat', chat.routes(), chat.allowedMethods());

module.exports = router;
