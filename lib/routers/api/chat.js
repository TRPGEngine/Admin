const Router = require('koa-router');
const router = new Router();

router.post('/_save', async (ctx, next) => {
  // ctx.router available
  await ctx.trpgapp.chat.saveChatLogAsync();
  ctx.body = {
    result: true
  }
});

router.get('/_log', async(ctx, next) => {
  let { page, limit } = ctx.request.query;
  page = Number(page) || 1;
  limit = Number(limit) || 10;

  let count = await ctx.trpgapp.chat.getChatLogSumAsync();
  let data = await ctx.trpgapp.chat.getChatLogAsync();

  ctx.body = {"code":0,"msg":"","count":count,"data":data}
})

module.exports = router;
