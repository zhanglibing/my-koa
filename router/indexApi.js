const Router = require('koa-router')

const router = new Router()

router.prefix('/index')

router.get('/index',(ctx,next)=>{
    ctx.body = "hello index module router"
})

router.get('/test', ctx => (ctx.body = `Hello Router!  ${ctx.user}`));
router.get('/test2/:id', ctx => (ctx.body = `Hello Router!  ${ctx.params.id}`));

module.exports = router
