const Router = require('koa-router');
const router = new Router();
const os = require('os');

router.get('/_info', async(ctx, next) => {
  ctx.body = {
    result: true,
    info: {
      arch: os.arch(),
      cpus: os.cpus(),
      freemem: os.freemem(),
      hostname: os.hostname(),
      platform: os.platform(),
      totalmem: os.totalmem(),
      type: os.type(),
      uptime: os.uptime(),
      loadavg: os.loadavg(),
    }
  }
})

module.exports = router;
