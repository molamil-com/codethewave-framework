function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<!doctype html> <html class="no-js" lang><head><meta charset="utf-8"><meta http-equiv="x-ua-compatible" content="ie=edge"><title>Hue</title><meta name="description" content><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><link rel="apple-touch-icon" href="apple-touch-icon.png"><link rel="stylesheet" href="../../main.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/detectizr/2.2.0/detectizr.min.js"></script><script src="../../js/pixi.min.js"></script><script src="../../js/TweenMax.min.js"></script></head><body><!--[if lt IE 8]>\n\n        <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>\n\n    <![endif]--><script src="../../sp-framework.js"></script><script>\n\n        var background;\n        var colorFilter;\t\t\t\t\n        var angle = 0;\n                            \n        SPF.set({\n\n            at:"back",\n            load: function(PIXI, input) \n            {\n                return [input.patterns.animaltech];\n            },\n\n            init: function(PIXI, input) \n            {\n                background = new PIXI.extras.TilingSprite(input.patterns.handdrawnanimal, 1, 1);\n                background.anchor.set(0);\n                input.container.addChild(background);\n\n\t            colorFilter = new PIXI.filters.ColorMatrixFilter();\n                background.filters = [colorFilter];\n            },\n\n            render:function(PIXI, input)\n            {\n                var speed = 5;\n                angle = (angle + speed) % 360;\n                colorFilter.hue(angle);\n            },\n\n            resize: function(PIXI, input) \n            {\n                background.width = input.width;\n                background.height = input.height;\n            }\n\n        });\n\n        SPF.info({\n            debug: false,\n            title: "ColorMatrix Filter (Hue)",\n            tip: "PIXI\'s ColorMatrix filter used to animate hue",\n            firstName: "Patrik",\n            lastName: "Svensson",\n            email: "ps@molamil.com"\n        });\n\n        SPF.start();\n\n    </script></body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);