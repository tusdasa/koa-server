const Koa = require('koa');
const { koaBody } = require('koa-body');
const Cors = require('@koa/cors');
const Logger = require('koa-logger');
const Views = require('@ladjs/koa-views');


const app = new Koa();

app.use(Logger());
app.use(koaBody());
app.use(Cors());
app.use(require('koa-static')(__dirname + '/public'));
// view config
app.use(Views(__dirname + '/views', {
  extension: 'pug'
}))


const index = require('./routes/index');

app.use(index.routes(), index.allowedMethods());


app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});


app.use(ctx => {
  ctx.set("Referrer-Policy",'no-referrer-when-downgrade');
});


app.listen(8081,() => {
  console.log('runing port 8081 ....');
});
