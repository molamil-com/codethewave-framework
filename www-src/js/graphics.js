

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

        animaltech: PIXI.Texture.fromImage(serverPath+folder+'SP_element_animaltech_001.png'),

        bbbbird1: PIXI.Texture.fromImage(serverPath+folder+'SP_element_bbbbird_001.png'),

        bbbbird2: PIXI.Texture.fromImage(serverPath+folder+'SP_element_bbbbird_002.png'),

        bbbbird3: PIXI.Texture.fromImage(serverPath+folder+'SP_element_bbbbird_003.png'),

        botanicorganic: PIXI.Texture.fromImage(serverPath+folder+'SP_element_botanicorganic_001.png'),

        handdrawnanimal1: PIXI.Texture.fromImage(serverPath+folder+'SP_element_handdrawnanimal_001.png'),

        handdrawnanimal2: PIXI.Texture.fromImage(serverPath+folder+'SP_element_handdrawnanimal_002.png'),

        handdrawnanimal3: PIXI.Texture.fromImage(serverPath+folder+'SP_element_handdrawnanimal_003.png')

    };

    return textures;


};

module.exports = {

    init:init
};



