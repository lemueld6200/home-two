const dotenv = require("dotenv");
dotenv.config();

const render = require("./lib/render");
const router = require("./lib/router");
const logger = require("koa-logger");
const koaBody = require("koa-body");
const static = require("koa-static");

const Koa = require("koa");
const app = (module.exports = new Koa())

  // Middleware
  .use(logger())
  .use(render)
  .use(koaBody())
  .use(router.routes())
  .use(static("public"))
  .use(async (ctx, next) => {
    try {
      await next();
      if (ctx.status === 404) {
        ctx.redirect("/404");
      }
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit("error", err, ctx);
    }
  });

if (!module.parent)
  app.listen(process.env.PORT, () =>
    console.log(`App listening on port ${process.env.PORT}...`)
  );
