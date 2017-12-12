const Router = require('koa-router');
const router = new Router();

const chat = require('./api/chat');
router.use('/api/chat', chat.routes(), chat.allowedMethods());

module.exports = router;
