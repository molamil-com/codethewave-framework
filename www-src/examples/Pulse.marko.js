function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<!doctype html> <html class="no-js" lang><head><meta charset="utf-8"><meta http-equiv="x-ua-compatible" content="ie=edge"><title>Pulse</title><meta name="description" content><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><link rel="apple-touch-icon" href="apple-touch-icon.png"><link rel="stylesheet" href="../main.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/detectizr/2.2.0/detectizr.min.js"></script><script src="../js/pixi.min.js"></script><script src="../js/TweenMax.min.js"></script></head><body><!--[if lt IE 8]>\n\n        <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>\n\n    <![endif]--><script src="../sp-framework.js"></script><script>\n\n        var background, backgroundColor;\n\n        SPF.set({\n\n            at:"back",\n\n            init: function(PIXI, input) {\n                background = new PIXI.Graphics();\n                input.container.addChild(background);\n            }\n\n        });\n\n        var text;\n\n        var circle,circleContainer;\n\n        SPF.set({\n\n            at:"fore",\n\n            init: function(PIXI, input) {\n\n                circleContainer = new PIXI.Container();\n                circle =  new PIXI.Graphics();\n                circleContainer.addChild(circle);\n                input.container.addChild(circleContainer);\n\n                text = new PIXI.Text(\'\', {fontFamily : \'Arial Black\', fontSize: 200, fill :0xFFFFFF, align : \'center\'});\n                text.anchor.set(0.5);\n                backgroundColor = 0xd4d4d4;\n                input.container.addChild(text);\n\n            },\n\n            resize: function(PIXI, input) {\n\n                text.position.set(input.width/2, input.height/2);\n\n                text.style.fontSize = input.width/22;\n\n                circle.clear();\n\n                circle.beginFill(0x00FF00, 1);\n                circle.drawCircle(0,0, (input.height/4));\n                circle.endFill();\n\n                circleContainer.position.set(input.width/2, input.height/2);\n\n            },\n\n            render: function(PIXI, input) {\n\n                if(input.pulse == null) {\n                    text.text = "";\n                    circle.scale.set(0);\n                    backgroundColor = 0xd4d4d4;\n                } else {\n                    text.text = "PULSE";\n                    circle.scale.set(1);\n                    backgroundColor = 0xFF0000;\n                }\n\n                background.clear();\n                background.beginFill(backgroundColor, 1);\n                background.drawRect(0,0,input.width,input.height);\n                background.endFill();\n\n            }\n\n\n        });\n\n\n\n        SPF.info({\n            debug: false,\n            title: "Pulse",\n            tip: "",\n            firstName: "Ramiro",\n            lastName: "Espada",\n            email: "re@ramiroespada.com"\n        });\n\n        SPF.start();\n\n    </script></body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);