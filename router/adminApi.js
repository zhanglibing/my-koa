const Router = require('koa-router')

const router = new Router()

router.prefix('/admin')

router.get('/index',(ctx,next)=>{
    ctx.body = "hello A module router"
})

module.exports = router
