const Koa = require('koa');
const json = require('koa-json');
const KoaRouter = require('koa-router');
const path = require('path');
const render = require('koa-ejs');

const app = new Koa();
const router = new KoaRouter();

// Replace with db
const things = ['My family', 'Programming', 'something'];

app.use(json());

// Router Middleware
// app.use(async (ctx) => (ctx.body = { message: 'Hello world' }));
render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false,
});

// Index
router.get('/', async (ctx) => {
  await ctx.render('index', {
    title: 'Thing I love:',
    things: things,
  });
});

router.get('/test', (ctx) => (ctx.body = 'Hello test'));

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log('Server Started...'));
