const fs = require("fs");
const path = require("path");
const Router = require("koa-router");

const router = (module.exports = new Router());

const walkSync = (dir = path.resolve(__dirname, "../views"), filelist = []) => {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    if (fs.statSync(path.resolve(dir, file)).isDirectory()) {
      filelist = walkSync(path.join(dir, file, "/"), filelist);
    } else {
      filelist.push(path.join(dir, file));
    }
  });
  return filelist;
};

const tree = walkSync();
tree.forEach(dir => {
  dir = dir.split("/");
  dir = dir
    .slice(Math.max(dir.length - 2, 1))
    .join("/")
    .split(".");
  dir.pop();
  dir = dir.join().split(" ").join("%20");

  const redir = async ctx => {
    await ctx.render(dir.split("%20").join(" "), { ctx, dir, tree });
  };

  router
    .get(`/${dir}`, redir)
    .get(`/${dir}.htm`, redir)
    .get(`/${dir}.html`, redir);
});
router.get("/", async ctx => {
  await ctx.render("index");
});
