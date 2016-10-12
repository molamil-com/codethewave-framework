
var $ = require('jquery');


(function(exports) {

    var background;

    var sprite;

    var masker;

    var flag;


    var Milight = require('milight');

    var milight = new Milight({
        host: "192.168.0.24",
        broadcast: false
    });


    SPF.set({

        at:"back",

        init: function(PIXI, input) {
            background = new PIXI.Graphics();
            input.container.addChild(background);

            milight.on();

        },

        render: function(PIXI, input) {

            var fs = input.audio.frequencies();

            var f = 0;
            var fAvailable= 0;

            if(fs) {

                for (var i = 0; i < fs.length; i++) {
                    if (fs[i] > 0) {
                        f += fs[i];
                        fAvailable++;
                    }
                }

                f = (f / (255 * fAvailable));


                if (f > 0.3 && !flag) {

                    if(!flag)
                        flag = true;

                    var c = input.colors[Math.round(Math.random() * ( input.colors.length - 1))];
                    background.clear();
                    background.beginFill(c, 1);
                    background.drawRect(0, 0, input.width, input.height);
                    background.endFill();
                } else {
                    if(flag)
                        flag = false;
                }
            }

        }

    });

    SPF.set({

        at:"mid",

        load: function(PIXI, input) {

            return [input.patterns.botanicorganic2];

        },

        init: function(PIXI, input) {

            sprite = new PIXI.extras.TilingSprite(input.patterns.botanicorganic2, 1, 1);
            sprite.anchor.set(0);
            input.container.addChild(sprite);

            SPF.midgroundMask(true);

        },


        resize: function(PIXI, input) {

            var w =  input.width;
            var h =  input.height;

            sprite.width = w;
            sprite.height = h;


        }

    });


    SPF.info({
        debug: false,
        title: "Video Masking ",
        tip: "Click or Tap to stop the mask",
        firstName: "Ramiro",
        lastName: "Espada",
        email: "re@ramiroespada.com"
    });

    SPF.start("chorus1");

})(window);
