function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<!doctype html> <html class="no-js" lang><head><meta charset="utf-8"><meta http-equiv="x-ua-compatible" content="ie=edge"><title>sp-framework</title><meta name="description" content><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><link rel="apple-touch-icon" href="apple-touch-icon.png"><link rel="stylesheet" href="../../main.css"></head><body style="padding: 40px; height: auto; width: auto; overflow: auto; font-size: 12px"><h1>Sections</h1><div style="padding: 20px;"><a href="intro.html">Intro</a><br><br></div><h2>Individual Effects &amp; Items</h2><div style="padding: 20px;"><a href="displacement.html">Displacement</a><br><br><a href="hue.html">Hue</a><br><br><a href="kaleidoscope.html">Kaleidoscope</a><br><br><a href="drift.html">Pixel Drift</a><br><br></div></body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);