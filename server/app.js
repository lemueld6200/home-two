const render = require("./render");
const router = require("./router");
const logger = require("koa-logger");
const koaBody = require("koa-body");
const static = require("koa-static");

const Koa = require("koa");
const app = (module.exports = new Koa())

  // Middleware
  .use(logger())
  .use(koaBody())
  .use(render)
  .use(router.routes())
  .use(static("public"))
  .use(async (ctx, next) => {
    try {
      await next();
      const status = ctx.status || 404;
      if (status === 404) {
        ctx.throw(404);
        console.log(status);
      }
    } catch (err) {
      ctx.status = err.status || 500;
      if (ctx.status === 404) {
        await ctx.render("404");
      } else {
        ctx.body = err.message;
        ctx.app.emit("error", err, ctx);
      }
    }
  });
