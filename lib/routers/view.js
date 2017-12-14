const Router = require('koa-router');
const router = new Router();
const auth = require('../utils/middleware').auth;

router.get('/login', function (ctx, next) {
  const template = require('../views/login.marko');
  ctx.render(template);
});

const home = require('./view/home');
const chat = require('./view/chat');
const system = require('./view/system');
router.use('/*', auth);
router.use('/home', home.routes(), home.allowedMethods());
router.use('/chat', chat.routes(), chat.allowedMethods());
router.use('/system', system.routes(), system.allowedMethods());

module.exports = router;
