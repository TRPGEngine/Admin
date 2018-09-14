const Router = require('koa-router');
const router = new Router();

router.get('/_list', async(ctx, next) => {
  let { page, limit } = ctx.request.query;
  page = Number(page) || 1;
  limit = Number(limit) || 10;

  let db = await ctx.trpgapp.storage.connectAsync();
  let count = 0;
  let data = [];
  try {
    count = await db.models.player_user.countAsync();
    data = await db.models.player_user.find().offset((page-1)*limit).limit(limit).findAsync();
  } finally {
    db.close();
  }

  ctx.body = {"code":0,"msg":"","count":count,"data":data}
});

router.get('/_onlineCount', async(ctx, next) => {
  let count = ctx.trpgapp.player.list.list.length;

  ctx.body = count;
})

module.exports = router;
