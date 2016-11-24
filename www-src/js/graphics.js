

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

        handdrawnanimal3: PIXI.Texture.fromImage(serverPath+folder+'SP_element_handdrawnanimal_003.png'),

        /* New assets for featured visuals */

        crazyflower1: PIXI.Texture.fromImage(serverPath+folder+'SP_element_crazyflower_001.png'),

        crazyflower2: PIXI.Texture.fromImage(serverPath+folder+'SP_element_crazyflower_002.png'),

        crazyflower3: PIXI.Texture.fromImage(serverPath+folder+'SP_element_crazyflower_003.png'),

        leaf1: PIXI.Texture.fromImage(serverPath+folder+'SP_element_leaf_001.png'),

        leaf2: PIXI.Texture.fromImage(serverPath+folder+'SP_element_leaf_palm_001.png'),

        flower1: PIXI.Texture.fromImage(serverPath+folder+'SP_element_pinkflower_circular.png'),

        stone: PIXI.Texture.fromImage(serverPath+folder+'SP_element_stone_001.png'),

        flower1: PIXI.Texture.fromImage(serverPath+folder+'SP_element_whiteflower.png'),

        wingwave: PIXI.Texture.fromImage(serverPath+folder+'SP_element_wing_wave2.png')

    };

    return textures;


};

module.exports = {

    init:init
};



