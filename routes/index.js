const router = require('koa-router')();

router.all('/', async (ctx, next) => {
    await ctx.render('index');
});

module.exports = router;
