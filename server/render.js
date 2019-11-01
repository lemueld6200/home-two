/**
 * Module dependencies.
 */

const path = require("path");
const views = require("koa-views");

/**
 * Setup views mapping .html
 * to the swig template engine.
 */

module.exports = views(path.resolve(__dirname, "../views/"), {
  map: { html: "swig" }
});
