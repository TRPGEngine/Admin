require('marko/node-require');
const debug = require('debug')('trpg:component:admin');
const serve = require('koa-static');
const config = require('./config/config.js');
const Router = require('koa-router');

module.exports = function ActorComponent(app) {
  initWebService.call(app);
  initRouters.call(app);
}

function initWebService() {
  const app = this;
  const webservice = app.webservice;
  if(app.get('env') === 'development') {
    webservice.use(serve(__dirname + '/public'));
    // 用于清理view相关缓存的require缓存
    webservice.use(async (ctx, next) => {
      let reqModules = Object.keys(require.cache);
      let viewModules = reqModules.filter((item) => /.*\/Admin\/lib\/views\//.test(item));
      for (let modulePath of viewModules) {
        delete require.cache[modulePath];
      }
      await next();
    })
  }else {
    webservice.use(serve(__dirname + '/public', {maxage: 1000 * 60 * 60 * 24}));
  }
  webservice.context.render = function (template, data) {
    this.response.type = 'html';
    this.response.body = template.stream(data);
  }
}

function initRouters() {
  const app = this;
  const webservice = app.webservice;
  const router = new Router();

  const api = require('./routers/api');
  const view = require('./routers/view');
  const captcha = require('./routers/captcha');
  // webservice.use(api.routes());
  // webservice.use(view.routes());
  // webservice.use(captcha.routes());

  router.use('/admin', api.routes(), view.routes(), captcha.routes());
  webservice.use(router.routes());
}
