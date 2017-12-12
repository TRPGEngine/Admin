require('marko/node-require');
const debug = require('debug')('trpg:component:admin');

module.exports = function ActorComponent(app) {
  initWebService.call(app);
  initRouters.call(app);
}


function initWebService() {
  const app = this;
  const webservice = app.webservice;
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
