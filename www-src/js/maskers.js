

var init = function(PIXI, input){

    var serverPath = require("./serverPath.js").serverPath;

    serverPath += "assets/";

    var folder = "25/";

    if(input.width >600){
        folder = "50/"
    };

    if(input.width >1024){
        folder = ""
    };


    var textures = {

        bbbbird1: PIXI.Texture.fromImage(serverPath+'SP_mask_bbbbird_001.png'),

        botanicorganic1: PIXI.Texture.fromImage(serverPath+folder+'SP_mask_botanicorganic_001.png'),

        botanicorganic2: PIXI.Texture.fromImage(serverPath+folder+'SP_mask_botanicorganic_002.png'),

        handdrawnanimal1: PIXI.Texture.fromImage(serverPath+folder+'SP_mask_handdrawnanimal_001.png'),

        handdrawnanimal2: PIXI.Texture.fromImage(serverPath+folder+'SP_mask_handdrawnanimal_002.png'),

        handdrawnanimal3: PIXI.Texture.fromImage(serverPath+folder+'SP_mask_handdrawnanimal_003.png'),

        handdrawnanimal4: PIXI.Texture.fromImage(serverPath+folder+'SP_mask_handdrawnanimal_004.png')

    };

    return textures;

};

module.exports = {

    init:init
};



