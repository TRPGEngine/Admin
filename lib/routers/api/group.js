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
    count = await db.models.group_group.countAsync();
    data = await db.models.group_group.find().offset((page-1)*limit).limit(limit).findAsync();
  } finally {
    db.close();
  }

  ctx.body = {"code":0,"msg":"","count":count,"data":data}
});

module.exports = router;
