const Router = require('koa-router');
const router = new Router();

router.get('/_list', async(ctx, next) => {
  let { page, limit } = ctx.request.query;
  page = Number(page) || 1;
  limit = Number(limit) || 10;

  let db = await ctx.trpgapp.storage.connectAsync();
  let count = await db.models.player_user.countAsync();
  let data = await db.models.player_user.find().offset((page-1)*limit).limit(limit).findAsync();
  db.close();

  ctx.body = {"code":0,"msg":"","count":count,"data":data}
});

module.exports = router;
