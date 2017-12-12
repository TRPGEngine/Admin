const Router = require('koa-router');
const router = new Router();

router.post('/_save', function (ctx, next) {
  // ctx.router available
  console.log('aaa');
});

module.exports = router;
