function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<!doctype html> <html class="no-js" lang><head><meta charset="utf-8"><meta http-equiv="x-ua-compatible" content="ie=edge"><title>Prechorus (Kaleidoscope)</title><meta name="description" content><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><link rel="apple-touch-icon" href="apple-touch-icon.png"><link rel="stylesheet" href="../../main.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/detectizr/2.2.0/detectizr.min.js"></script><script src="../../js/pixi.min.js"></script><script src="../../js/TweenMax.min.js"></script></head><body><!--[if lt IE 8]>\n\n        <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>\n\n    <![endif]--><script src="../../sp-framework.js"></script><script>\n         \n        print = console.log \n        var DEG2RAD = Math.PI / 180.0;\n        var RAD2DEG = 180.0 / Math.PI;\n        var TAU = Math.PI * 2;\n        var sprites = [];\n        var xp = [\n            0.3, 0.7,\n            0.1, 0.5, 0.9,\n            0.3, 0.7,\n        ]\n\n        var yp = [\n            0, 0,\n            0.5,0.5,0.5,\n            1, 1,\n        ]\n\n        var scale = 1;\n        var beatInterval = 1000;//millis\n        var lastBeatTime;\n        var spriteRotationSpeed = 0;\n        var leftCenterPiece, rightCenterPiece, leftCenterPieceMask, rightCenterPieceMask\n        //var leftCenterPieceContainer, rightCenterPieceContainer;\n        var centerPieceVisible = false;\n\n        var maxSections = 16;\n        var minSections = 6;\n        var sectionsStep = 2;\n        var currentSections = minSections;\n        var kaleidoscopeMasks = [];\n        var kaleidoscopeSprites = [];\n        var kaleidoscopeTexture;\n        var kaleidoscopeTextureFlipped;\n        var kaleidoscopeContainer;\n\n        var speed = new Vector2(2, 0);\n        var scrollOffset = new Vector2(0,0);\n\n        function showCenterPiece(PIXI, input)\n        {\n            centerPieceVisible = true;\n            updateMasks(PIXI, input);\n\n            var offsetX = input.width / 6.0;\n            var offsetY = input.width / 3.0;\n            var duration = 4.0;\n            var rotation = 360;\n            leftCenterPiece.x += offsetX;\n            leftCenterPiece.y += offsetY;\n            rightCenterPiece.x -= offsetX;\n            rightCenterPiece.y += offsetY;\n            leftCenterPiece.rotation = rightCenterPiece.rotation = 0;\n            rightCenterPiece.alpha = leftCenterPiece.alpha = 0;\n            //Now animate, if resizing while animating it might break\n            TweenMax.to(leftCenterPiece, 0.5, {alpha: 1});\n            TweenMax.to(rightCenterPiece, 0.5, {alpha: 1});\n            TweenMax.to(leftCenterPiece, duration, {rotation: - rotation * DEG2RAD, x: input.width/2, y: input.height, ease: Power2.easeOut});\n            TweenMax.to(rightCenterPiece, duration, {rotation: rotation * DEG2RAD, x: input.width/2, y: input.height, ease: Power2.easeOut, onComplete:function(){\n                centerPieceVisible = false;\n                updateMasks(PIXI, input);\n                for(var i = 0;i<7;i++)\n                {\n                    sprites[i].alpha = 1;\n                }\n                updateSprites(PIXI, input)\n                \n            }});\n\n            for(var i = 0;i<7;i++)\n            {\n                TweenMax.to(sprites[i], 1, {alpha: 0});\n                TweenMax.to(sprites[i].scale, 1, {x: .1, y: .1, ease: Power2.easeIn});\n            }\n\n            //reset for testing purposes\n        }\n\n        function updateMasks(PIXI, input)\n        {\n                //Update masks\n            leftCenterPieceMask.clear();\n            leftCenterPieceMask.beginFill(0xff0000);\n            leftCenterPieceMask.drawRect(0, 0, input.width / 2, input.height);\n\n            leftCenterPiece.x = input.width / 2;\n            leftCenterPiece.y = input.height;\n\n            leftCenterPiece.scale.x = - input.width / 1024.0;\n            leftCenterPiece.scale.y = input.width / 1024.0;\n            leftCenterPiece.mask = leftCenterPieceMask;\n                \n            rightCenterPieceMask.clear();\n            rightCenterPieceMask.beginFill(0xff0000);\n            rightCenterPieceMask.drawRect(input.width / 2, 0, input.width / 2, input.height);\n                \n            rightCenterPiece.x  = input.width / 2;\n            rightCenterPiece.y  = input.height;\n\n            rightCenterPiece.scale.x = rightCenterPiece.scale.y = input.width / 1024.0;\n            rightCenterPiece.mask = rightCenterPieceMask;\n\n            leftCenterPiece.visible = centerPieceVisible;\n            rightCenterPiece.visible = centerPieceVisible;\n        }\n\n        function updateSprites(PIXI, input)\n        {\n            for(var i = 0;i<7;i++)\n            {\n                sprites[i].x = xp[i] * input.width;\n                sprites[i].y = yp[i] * input.height;\n                sprites[i].scale.x = sprites[i].scale.y = (input.width / 1500.0) *scale;\n            }\n        }\n\n        SPF.set({\n\n            at:"back",\n            load: function(PIXI, input) \n            {\n                return [];\n            },\n\n            init: function(PIXI, input) \n            {\n                //Kaleidoscope\n                kaleidoscopeTexture = input.patterns.animaltech;\n                kaleidoscopeContainer = new PIXI.Container();\n                input.container.addChild(kaleidoscopeContainer);\n                updateKaleidoscope(PIXI, input);\n\n                var index = Math.round(Math.random() * 1);\n                scale = index == 0 ? 0.45: 1;\n                var frontSpriteTexture = PIXI.Texture.fromImage([\'../../assets/ps_temp/SP_element_crazyflower_001.png\', \'/assets/SP_element_botanicorganic_001.png\'][index]); //TODO: Move to framework, one of these exist\n                for(var i = 0;i<7;i++)\n                {\n                    var sprite = new PIXI.Sprite(frontSpriteTexture);\n                    sprite.anchor.set(0.5);\n                    input.container.addChild(sprite);\n                    sprites.push(sprite);\n                }\n\n                //centerpiece\n\n                var centerPieceTexture = PIXI.Texture.fromImage(\'../../assets/ps_temp/SP_element_wing_wave2.png\');//TODO: add to framework\n\n                //centerPieceContainer = new PIXI.Container();\n                //input.container.addChild(centerPieceContainer);\n                leftCenterPieceMask = new PIXI.Graphics();\n                leftCenterPieceMask.beginFill(0xFF0000);\n                leftCenterPieceMask.drawRect(0, 0, 100, 100);\n                input.container.addChild(leftCenterPieceMask);\n                \n                leftCenterPieceContainer = new PIXI.Container();\n                input.container.addChild(leftCenterPieceContainer);\n                \n                leftCenterPiece = new PIXI.Sprite(centerPieceTexture);\n                leftCenterPiece.anchor.set(0.5);\n                leftCenterPieceContainer.addChild(leftCenterPiece);\n                leftCenterPiece.scale.x = -1;\n                //leftCenterPieceContainer.mask = leftCenterPieceMask;\n                \n                rightCenterPieceMask = new PIXI.Graphics();\n                rightCenterPieceMask.beginFill(0xFF0000);\n                rightCenterPieceMask.drawRect(0, 0, 100, 100);\n                input.container.addChild(rightCenterPieceMask);\n\n                rightCenterPieceContainer = new PIXI.Container();\n                input.container.addChild(rightCenterPieceContainer);\n                \n                rightCenterPiece = new PIXI.Sprite(centerPieceTexture);\n                rightCenterPiece.anchor.set(0.5);\n                input.container.addChild(rightCenterPiece);\n                //rightCenterPieceContainer.mask = rightCenterPieceMask;\n                \n                //\n                lastBeatTime = new Date().getTime();\n            },\n\n            render:function(PIXI, input)\n            {\n                var timeSinceBeat = new Date().getTime() - lastBeatTime;\n                if (timeSinceBeat > beatInterval)\n                {\n                    lastBeatTime = new Date().getTime();\n                    spriteRotationSpeed = 15 * DEG2RAD;\n                    speed.y = 4;\n                }\n\n                for(var i = 0;i<7;i++)\n                {\n                    sprites[i].rotation += spriteRotationSpeed\n                }\n\n                spriteRotationSpeed *= 0.75;\n\n                //Kaleidoscope\n                scrollOffset = scrollOffset.add(speed);\n                for(var i=0;i<kaleidoscopeSprites.length;i++)\n                {\n                    kaleidoscopeSprites[i].tilePosition.x = scrollOffset.x;\n                    kaleidoscopeSprites[i].tilePosition.y = scrollOffset.y;\n                }\n                \n                speed.y *= 0.9;\n            },\n\n            mouseDownTouchStart: function(PIXI, input) \n            {\n                //DEV. For now show centerpiece when clicking\n                showCenterPiece(PIXI, input);\n\n                currentSections = (currentSections - minSections + sectionsStep) % (maxSections - minSections + sectionsStep) + minSections;\n                updateKaleidoscope(PIXI, input);\n            },\n\n            resize: function(PIXI, input) \n            {\n                updateKaleidoscope(PIXI, input);\n                updateSprites(PIXI, input);\n                updateMasks(PIXI, input);\n            }\n        });\n\n        SPF.info({\n            debug: false,\n            title: "Pre Chorus",\n            tip: "Click to test out transition",\n            firstName: "Patrik",\n            lastName: "Svensson",\n            email: "ps@molamil.com"\n        });\n\n        SPF.start();\n\n        //KALEIDOSCOPE\n        function addSection(PIXI, input, flip)\n        {\n            //var sprite = new PIXI.Sprite(flip ? kaleidoscopeTextureFlipped : kaleidoscopeTexture); //negative scale on sprite and mask does not work\n            //var sprite = new PIXI.Sprite(kaleidoscopeTexture); //negative scale on sprite and mask does not work\n            var sprite = new PIXI.extras.TilingSprite(kaleidoscopeTexture, 500, 500);\n            sprite.anchor.set(0.5, 0.5);\n            kaleidoscopeContainer.addChild(sprite);\n            kaleidoscopeSprites.push(sprite);\n\n            var mask = new PIXI.Graphics();\n            mask.clear();\n            kaleidoscopeContainer.addChild(mask);\n            kaleidoscopeMasks.push(mask);\n                \n        }\n        function removeSection(PIXI, input)\n        {\n            var sprite = kaleidoscopeSprites.shift();\n            var mask = kaleidoscopeMasks.shift();\n            sprite.parent.removeChild(sprite);\n            mask.parent.removeChild(mask);\n        }\n\n        function updateKaleidoscope(PIXI, input)\n        {\n            //Add\n            while(kaleidoscopeSprites.length < currentSections)\n            {\n                addSection(PIXI, input, 0 == kaleidoscopeSprites.length % 2);\n            }\n\n            //Remove\n            while(kaleidoscopeSprites.length > currentSections)\n            {\n                removeSection(PIXI, input);\n            }\n\n            //Draw\n            var center = new Vector2(input.width * 0.5, input.height * 0.5);\n            var length = Math.sqrt(input.width * input.width + input.height * input.height);//This is bigger than needed\n            for (var i = 0;i<currentSections; i++)\n            {\n                var t = i / (currentSections - 1.0);\n                var startAngle = i / (currentSections * 1.0) * TAU;\n                var endAngle = (i+1) / (currentSections * 1.0) * TAU;\n                \n                var angle = startAngle * 0.5 + endAngle * 0.5;\n                \n                //Sprite\n                var sprite = kaleidoscopeSprites[i];\n                sprite.width = sprite.height = length;\n                sprite.x = center.x;\n                sprite.y = center.y;\n                var flip = (0 == i % 2) ? 1 : -1;\n                sprite.scale.y = Math.abs(sprite.scale.y) * flip;\n                sprite.rotation = angle;\n\n                //Mask\n                var mask = kaleidoscopeMasks[i];\n                mask.clear();\n                mask.beginFill(input.colors[i]);\n                mask.drawPolygon([\n                        center.x, center.y,\n                        center.x + Math.cos(startAngle) * length, center.y + Math.sin(startAngle) * length,\n                        center.x + Math.cos(endAngle) * length, center.y + Math.sin(endAngle) * length,\n                        center.x, center.y\n                    ]);\n                mask.endFill();\n                \n                sprite.mask = mask;\n\n            }\n        }\n\n        //HELPERS\n        //Vector2 \n        function Vector2(x, y)\n        {\n            this.x = x || 0;\n            this.y = y || 0;\n        };\n\n        Vector2.prototype.x = null;\n        Vector2.prototype.y = null;\n        Vector2.prototype.add = function (v) {\n            return new Vector2(this.x + v.x, this.y + v.y);\n        };\n        Vector2.prototype.clone = function () {\n            return new Vector2(this.x, this.y);\n        };\n        Vector2.prototype.distance = function (v) {\n            var x = this.x - v.x;\n            var y = this.y - v.y;\n            return Math.sqrt(x * x + y * y);\n        };\n        Vector2.prototype.equals = function (toCompare) {\n            return this.x == toCompare.x && this.y == toCompare.y;\n        };\n        Vector2.prototype.interpolate = function (v, f) {\n            return new Vector2((this.x + v.x) * f, (this.y + v.y) * f);\n        };\n        Vector2.prototype.length = function () {\n            return Math.sqrt(this.x * this.x + this.y * this.y);\n        };\n        Vector2.prototype.sqrLength = function () {\n            return this.x * this.x + this.y * this.y;\n        };\n        Vector2.prototype.normalize = function (thickness = 1) {\n            var l = this.length();\n            this.x = this.x / l * thickness;\n            this.y = this.y / l * thickness;\n        };\n        Vector2.prototype.offset = function (dx, dy) {\n            this.x += dx;\n            this.y += dy;\n        };\n        Vector2.prototype.subtract = function (v) {\n            return new Vector2(this.x - v.x, this.y - v.y);\n        };\n        Vector2.prototype.toString = function () {\n            return "(x=" + this.x + ", y=" + this.y + ")";\n        };\n\n        Vector2.interpolate = function (pt1, pt2, f) {\n            return new Vector2((pt1.x + pt2.x) * f, (pt1.y + pt2.y) * f);\n        };\n        Vector2.distance = function (pt1, pt2) {\n            var x = pt1.x - pt2.x;\n            var y = pt1.y - pt2.y;\n            return Math.sqrt(x * x + y * y);\n        };\n\n    </script></body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);