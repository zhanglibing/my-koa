const Koa = require('koa');
const json = require('koa-json');
const KoaRouter = require('koa-router');
const path = require('path');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');
const registerRouter  = require('./router')
const app = new Koa();
const router = new KoaRouter();



// json pretty
app.use(json());

app.use(bodyParser());

// 给上下文 context添加属性
app.context.user = '米斯特吴';

// DB
const things = [
  { name: 'my family' },
  { name: 'programming' },
  { name: 'music' }
];

// 配置模板引擎
render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',  //模版
  viewExt: 'html',
  cache: false,   //是否开启缓存
  debug: false
});

// 路由跳转 index
router.get('/', index);

// 函数声明
async function index(ctx) {
  await ctx.render('index', {
    title: 'Things i love....',
    things: things
  });
}

router.get('/add', showAdd);

async function showAdd(ctx) {
  await ctx.render('add');
}

// 添加路由方法
router.post('/add', add);

async function add(ctx) {
  const body = ctx.request.body;
  // console.log(body);
  things.push({ name: body.thing });
  ctx.redirect('/');
}



//使用合并后的路由
app.use(registerRouter())

// 配置路由模块
app.use(router.routes()).use(router.allowedMethods());

// localhost:3000
app.listen(3000, () => console.log('Server Started....'));
