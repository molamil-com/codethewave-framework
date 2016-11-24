function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<!doctype html> <html class="no-js" lang><head><meta charset="utf-8"><meta http-equiv="x-ua-compatible" content="ie=edge"><title>Drift</title><meta name="description" content><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><link rel="apple-touch-icon" href="apple-touch-icon.png"><link rel="stylesheet" href="../../main.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/detectizr/2.2.0/detectizr.min.js"></script><script src="../../js/pixi.min.js"></script><script src="../../js/TweenMax.min.js"></script></head><body><!--[if lt IE 8]>\n\n        <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>\n\n    <![endif]--><script src="../../sp-framework.js"></script><script>\n\n        var background;\n        var driftFilter;\n        var driftSpeed = 0.0001;\n        var displaceSpeed = 0.25;\n        var drift = 0.1;\n        var driftFrag = [\n            "varying vec2 vTextureCoord;",\n            "uniform sampler2D uSampler;",\n            "uniform float texelHeight;",\n            "uniform float drift;",\n            "void main(void) {",\n            "   vec2 uv = vTextureCoord;",\n            "   uv.y = mod(drift + texelHeight*uv.y*30.0, 1.0);",\n            "   vec4 col = texture2D(uSampler, uv);",\n            "   gl_FragColor = col;",\n            "}",\n        ].join("\\n");\n\n        var displacementFilter;\n        var displacementSprite;\n\n        SPF.set({\n\n            at:"back",\n            load: function(PIXI, input) \n            {\n                return [\n                    input.graphics.leaf1,\n                    input.patterns.clouds\n                    ];\n            },\n\n            init: function(PIXI, input) \n            {\n                leafTexture = input.graphics.leaf1;\n                leafTexture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT\n                background = new PIXI.Sprite(leafTexture);\n                input.container.addChild(background);\n\n                uniforms = {\n                    "texelHeight": {\n                        type:"f",\n                        value: 1.0/input.height\n                    },\n                    "drift": {\n                        type:"f",\n                        value: 0.0\n                    }\n                };\n\n                driftFilter = new PIXI.Filter(null,driftFrag,uniforms);\n                //background.filters = [driftFilter];\n\n                //Displace\n                var displacementTexture = input.patterns.clouds;\n                displacementTexture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT\n                \n                //Standard\n                displacementSprite = new PIXI.Sprite(displacementTexture);\n                displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);\n                input.container.addChild(displacementSprite);\n                //background.filters = [displacementFilter];\n                var scale = 50;\n                displacementFilter.scale.x = scale;\n                displacementFilter.scale.y = scale;\n                displacementFilter.resolution = 1; //Lower values are faster, higher better quality\n                \n                background.filters = [driftFilter, displacementFilter];\n            },\n\n            render:function(PIXI, input)\n            {\n                driftFilter.uniforms.texelHeight = 1.0 / input.height;\n                drift += driftSpeed;\n                driftFilter.uniforms.drift = drift;\n                displacementSprite.x += displaceSpeed;\n            },\n\n            resize: function(PIXI, input) \n            {\n                background.width = input.width;\n                background.height = input.height;\n            }\n        });\n\n        SPF.info({\n            debug: false,\n            title: "Drift",\n            tip: "PIXI Drift Filter",\n            firstName: "Patrik",\n            lastName: "Svensson",\n            email: "ps@molamil.com"\n        });\n\n        SPF.start();\n\n    </script></body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);