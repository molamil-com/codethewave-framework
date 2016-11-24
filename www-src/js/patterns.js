

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

        animaltech: PIXI.Texture.fromImage(serverPath+folder+'SP_pattern_animaltech_LO.jpg'),

        bbbbird1: PIXI.Texture.fromImage(serverPath+folder+'SP_pattern_bbbbird_LO_001.jpg'),

        bbbbird2: PIXI.Texture.fromImage(serverPath+folder+'SP_pattern_bbbbird_LO_002.jpg'),

        botanicorganic1: PIXI.Texture.fromImage(serverPath+folder+'SP_pattern_botanicorganic_LO_001.jpg'),

        botanicorganic2: PIXI.Texture.fromImage(serverPath+folder+'SP_pattern_botanicorganic_LO_002.jpg'),

        botanicorganic3: PIXI.Texture.fromImage(serverPath+folder+'SP_pattern_botanicorganic_LO_003.jpg'),

        handdrawnanimal: PIXI.Texture.fromImage(serverPath+folder+'SP_pattern_handdrawnanimal_LO.jpg'),

        /* New assets for featured visuals */

        botanicorganic4: PIXI.Texture.fromImage(serverPath+folder+'SP_pattern_botanicorganic_background.jpg'),

        botanicorganic5: PIXI.Texture.fromImage(serverPath+folder+'SP_pattern_botanicorganic_crazyness.png'),

        handdrawnanimal2: PIXI.Texture.fromImage(serverPath+folder+'SP_pattern_handdrawnanimal.jpg'),

        /* KEEP UNDOCUMENTED FOR NOW */

        clouds: PIXI.Texture.fromImage(serverPath+folder+'clouds.jpg')
    };

    return textures;

};

module.exports = {

    init:init
};




