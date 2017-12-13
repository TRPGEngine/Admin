const Router = require('koa-router');
const router = new Router();

const chat = require('./api/chat');
const system = require('./api/system');
router.use('/api/chat', chat.routes(), chat.allowedMethods());
router.use('/api/system', system.routes(), system.allowedMethods());

module.exports = router;
