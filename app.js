const Koa = require('koa');
const json = require('koa-json');
const KoaRouter = require('koa-router');
const path = require('path');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new KoaRouter();

// Replace with db
const things = ['My family', 'Programming', 'something'];

app.use(json());

// BodyParser Middleware
app.use(bodyParser());

// Router Middleware
// app.use(async (ctx) => (ctx.body = { message: 'Hello world' }));
render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false,
});

router.get('/', index);
router.get('/add', showAdd);
router.post('/add', add);

// Index
async function index(ctx) {
  await ctx.render('index', {
    title: 'Thing I love:',
    things: things,
  });
}

// show add page
async function showAdd(ctx) {
  await ctx.render('add', {
    things: things,
  });
}

// add thing
async function add(ctx) {
  const body = ctx.request.body;
  things.push(body.thing);
  ctx.redirect('/');
}

router.get('/test', (ctx) => (ctx.body = 'Hello test'));

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log('Server Started...'));
