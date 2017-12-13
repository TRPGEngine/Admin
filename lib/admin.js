require('marko/node-require');
const debug = require('debug')('trpg:component:admin');
const serve = require('koa-static');
const session = require('koa-session');
const config = require('./config/config.js');

module.exports = function ActorComponent(app) {
  initWebService.call(app);
  initRouters.call(app);
}

function initWebService() {
  const app = this;
  const webservice = app.webservice;
  webservice._app.keys = ['trpg game admin'];
  webservice.use(session(config.session, webservice._app));
  webservice.use(serve(__dirname + '/public'));
  if(app.get('env') === 'development') {
    // 用于清理view相关缓存的require缓存
    webservice.use(async (ctx, next) => {
      let reqModules = Object.keys(require.cache);
      let viewModules = reqModules.filter((item) => /.*\/Admin\/lib\/views\//.test(item));
      for (let modulePath of viewModules) {
        delete require.cache[modulePath];
      }
      await next();
    })
  }
  webservice.context.trpgapp = app;
  webservice.context.render = function (template, data) {
    this.response.type = 'html';
    this.response.body = template.stream(data);
  }
}

function initRouters() {
  const app = this;
  const webservice = app.webservice;

  const api = require('./routers/api');
  const view = require('./routers/view');
  webservice.use(api.routes());
  webservice.use(view.routes());
}
