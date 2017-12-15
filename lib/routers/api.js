const Router = require('koa-router');
const router = new Router();
const authAjax = require('../utils/middleware').authAjax;

const player = require('./api/player');
const chat = require('./api/chat');
const system = require('./api/system');
router.use('/api/system', system.routes(), system.allowedMethods());
router.use('/api/*', authAjax);
router.use('/api/player', player.routes(), player.allowedMethods());
router.use('/api/chat', chat.routes(), chat.allowedMethods());

module.exports = router;
