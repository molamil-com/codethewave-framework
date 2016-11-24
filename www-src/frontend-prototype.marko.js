function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<!doctype html> <html class="no-js" lang><head><meta charset="utf-8"><meta http-equiv="x-ua-compatible" content="ie=edge"><title>sp-framework</title><meta name="description" content><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><link rel="apple-touch-icon" href="apple-touch-icon.png"><link rel="stylesheet" href="main.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/detectizr/2.2.0/detectizr.min.js"></script><script src="./js/pixi.min.js"></script><script src="./js/popcorn.js"></script><script src="./js/TweenMax.min.js"></script></head><body style="background-color: #000"><h1 id="loading" style="color:#FFF; width:100%; text-align: center; top:50%; position: relative">LOADING...</h1><!--[if lt IE 8]>\n\n        <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>\n\n    <![endif]--><script src="sp-framework.js"></script><div id="SPFCover" style="cursor:pointer; z-index: 200; position:absolute; top:0; left:0; width:100%; height: 100%; background-color: orange;" onclick="  visual1(); document.getElementById(&#39;SPFCover&#39;).style.display = &#39;none&#39;"><h1 style="color:#FFF; width:100%; text-align: center; top:50%; position: relative">SCARLET PLEASURE</h1></div><div id="SPFTitle" style="position:absolute; top:0; left:0; width:100%; height: 100%; background-color: blue;" onclick="document.getElementById(&#39;SPFCover&#39;).style.display = &#39;none&#39;"><h1 style="color:#FFF; width:100%; text-align: center; top:50%; position: relative">THE WAVE</h1></div><canvas id="SPFCanvas"></canvas><div id="controls" style="z-index: 100; position:absolute; width: 100%; top:0; left:0px; text-align: center; text-transform:uppercase"><br><h1 style="color:#FFF; margin: 20px;">Frontpage prototype</h1><button style="display:inline-block; margin: 10px;" onclick="SPF.play();">PLAY</button><button style="display:inline-block; margin: 10px;" onclick="SPF.pause();">PAUSE</button><br><button style="display:inline-block; margin: 10px;" onclick="javascript:SPF.playSection(&#39;bridge&#39;)">Section: bridge</button><button style="display:inline-block; margin: 10px;" onclick="javascript:SPF.playSection(&#39;outro&#39;)">Section: outro</button><br><button style="display:inline-block; margin: 10px;" onclick="javascript:visual1()">VISUAL I</button><button style="display:inline-block; margin: 10px;" onclick="javascript:visual2()">VISUAL II</button></div><script>\n\n        document.getElementById(\'SPFCover\').style.display = "none";\n        document.getElementById(\'controls\').style.display = "none";\n        document.getElementById(\'SPFTitle\').style.display = "none";\n\n        SPF.load(function(){\n\n            SPF.startFrontend(document.getElementById(\'SPFCanvas\'), document.getElementById(\'SPFCover\'));\n\n\n            document.getElementById(\'SPFCover\').style.display = "block";\n            document.getElementById(\'controls\').style.display = "block";\n            document.getElementById(\'loading\').style.display = "none";\n\n        });\n\n\n        draw = function(){\n\n            var percentage = document.body.getAttribute("data-video-percentage");\n            var editing = document.body.getAttribute("data-video-editing");\n\n            if(percentage<25 && editing == "none"){\n                document.getElementById(\'SPFTitle\').style.display = "block";\n            } else {\n                document.getElementById(\'SPFTitle\').style.display = "none";\n            }\n\n            SPF.log("EDITING", editing);\n\n            requestAnimationFrame(draw);\n        };\n\n        draw();\n\n        var fs;\n\n        function visual1(){\n\n            var tilingSpriteBack;\n\n            SPF.set({\n\n                at: \'mid\', // "fore" "mid" or "back"\n\n                load: function(PIXI, input) {\n                    return [input.patterns.botanicorganic1];\n                },\n\n                init: function(PIXI, input) {\n\n                    tilingSpriteBack = new PIXI.extras.TilingSprite(input.patterns.botanicorganic1, 1, 1);\n                    tilingSpriteBack.anchor.set(0.5);\n                    input.container.addChild(tilingSpriteBack);\n\n                    SPF.midgroundMask(true);\n\n\n                },\n\n                render: function(PIXI, input) {\n\n\n                    SPF.midgroundMask(true);\n\n                    fs = input.audio.frequencies();\n\n                    tilingSpriteBack.rotation += 0.01+(fs[Math.round(fs.length/2)]/1500);\n                },\n\n                resize: function(PIXI, input) {\n\n                    var w =  input.width;\n                    var h =  input.height;\n\n                    tilingSpriteBack.width = w*2;\n                    tilingSpriteBack.height = h*2;\n\n                    tilingSpriteBack.x = w/2;\n                    tilingSpriteBack.y = h/2;\n                }\n\n            });\n\n            SPF.set({at: \'back\'\n\n            });\n\n            SPF.set({at: \'fore\'});\n\n            SPF.info({number:"01", debug:true, title:"VISUAL I", tip:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum rutrum sodales. Nullam mattis fermentum libero, non volutpat.", firstName:"Nikolaj", lastName:"Staus", email:"ns@molamil.com"});\n\n\n        };\n\n        function visual2(){\n\n            var tilingSpriteBack;\n\n            SPF.set({\n\n                at: \'back\', // "fore" "mid" or "back"\n\n                load: function(PIXI, input) {\n                    return [input.patterns.botanicorganic2];\n                },\n\n                init: function(PIXI, input) {\n\n                    tilingSpriteBack = new PIXI.extras.TilingSprite(input.patterns.botanicorganic2, 1, 1);\n                    tilingSpriteBack.anchor.set(0.5);\n                    input.container.addChild(tilingSpriteBack);\n\n                },\n\n                render: function(PIXI, input) {\n\n                    fs = input.audio.frequencies();\n\n                    tilingSpriteBack.rotation -= 0.01+(fs[Math.round(fs.length/2)]/1500);\n                },\n\n                resize: function(PIXI, input) {\n\n                    var w =  input.width;\n                    var h =  input.height;\n\n                    tilingSpriteBack.width = w*2;\n                    tilingSpriteBack.height = h*2;\n\n                    tilingSpriteBack.x = w/2;\n                    tilingSpriteBack.y = h/2;\n                }\n\n            });\n\n            SPF.set({at: \'mid\'});\n\n            SPF.set({at: \'fore\'});\n\n            SPF.info({number:"02", debug:true, title:"VISUAL II", tip:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum rutrum sodales. Nullam mattis fermentum libero, non volutpat.", firstName:"Ramiro", lastName:"Espada", email:"re@ramiroespada.com"});\n\n        };\n\n    </script></body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);