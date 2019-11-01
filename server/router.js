const fs = require("fs");
const path = require("path");
const Router = require("koa-router");

const router = (module.exports = new Router());

const walkSync = (dir = path.resolve(__dirname, "../views"), fileList = []) => {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    if (fs.statSync(path.resolve(dir, file)).isDirectory()) {
      fileList = walkSync(path.join(dir, file, "/"), fileList);
    } else {
      fileList.push(path.join(dir, file));
    }
  });
  return fileList;
};

const tree = walkSync();
tree.forEach(dir => {
  dir = dir.split("views")[1].split(".");
  dir.pop();
  dir = dir
    .join()
    .split(" ")
    .join("%20");

  const reDir = async ctx => {
    await ctx.render(`../views${dir.split("%20").join(" ")}`, {
      ctx,
      dir,
      tree
    });
  };

  router
    .get(dir, reDir)
    .get(`${dir}.htm`, reDir)
    .get(`${dir}.html`, reDir);
});

router.get("/", async ctx => await ctx.render("index"));
