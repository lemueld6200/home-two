const fs = require("fs");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();

const render = require("./lib/render");
const logger = require("koa-logger");
const router = require("koa-router")();
const koaBody = require("koa-body");
const static = require("koa-static");

const Koa = require("koa");
const app = (module.exports = new Koa());

// Middleware
app
  .use(logger())
  .use(render)
  .use(koaBody())
  .use(static("public"));

const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);
  files.forEach(function(file) {
    if (fs.statSync(path.resolve(dir, file)).isDirectory()) {
      filelist = walkSync(path.join(dir, file, "/"), filelist);
    } else {
      filelist.push(path.join(dir, file));
    }
  });
  return filelist;
};
const tree = walkSync("views");
tree.forEach(dir => {
  dir = dir.split("/");
  dir = dir
    .slice(Math.max(dir.length - 2, 1))
    .join("/")
    .split(".");
  dir.pop();
  dir = dir.join();

  const redir = async ctx => {
    await ctx.render(dir.split("%20").join(" "), { ctx, dir, tree });
  };

  router
    .get(`/${dir}`, redir)
    .get(`/${dir}.html`, redir)
    .get(`/${dir.split(" ").join("%20")}`, redir)
    .get(`/${dir.split(" ").join("%20")}.html`, redir);
});
router.get("/", async ctx => {
  await ctx.render("index");
});

app.use(router.routes()).use(async (ctx, next) => {
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
  app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}...`));
