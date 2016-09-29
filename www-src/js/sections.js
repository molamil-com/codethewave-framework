
var init = function(){

    var sections = [

        { "id":"intro", "label":"Intro", "label-min":"I", percentage:"4.2", starts:"0", ends:"8675" },

        { "id":"verse1", "label":"Verse I", "label-min":"V",percentage:"16.6", starts:"8675", ends:"42937" },

        { "id":"preChorus1", "label":"Pre Chorus", "label-min":"PC", percentage:"8.3", starts:"42937", ends:"60057" },

        { "id":"chorus1", "label":"Chorus",  "label-min":"C", percentage:"8.4", starts:"60057", ends:"77258" },

        { "id":"verse2", "label":"Verse II",  "label-min":"V", percentage:"16.6", starts:"77258", ends:"111500" },

        { "id":"preChorus2", "label":"Pre Chorus",  "label-min":"PC", percentage:"8.3", starts:"111500", ends:"128659" },

        { "id":"chorus2", "label":"Chorus",  "label-min":"C", percentage:"8.4", starts:"128659", ends:"145830" },

        { "id":"bridge", "label":"Bridge",  "label-min":"B", percentage:"8.3", starts:"145830", ends:"162954" },

        { "id":"chorus3", "label":"Chorus",  "label-min":"C", percentage:"8.4", starts:"162954", ends:"180108" },

        { "id":"outro", "label":"Outro",  "label-min":"O", percentage:"12.5", starts:"180108", ends:"206000" }


    ];

    return sections;

};

module.exports = {

    init:init

};

/*


 --------------------------------------------------------

 Reference for final song

 --------------------------------------------------------

 intro: Intro (00.000) (0 to 8675) 8675 = 4.2%

 verse1: Verse I (00:08.675) (8675 to 42937) 34262 = 16.6%

 preChorus1: Pre Chorus (0:42.937) (42937 to 60057) 17120 = 8.3%

 chorus1: Chorus (1:00.057) (60057 to 77258) 17201 = 8.4%

 verse2: Verse II (1:17.258) (77258 to 111500) 34242 = 16.6%

 preChorus2: Pre Chorus (1:51.500) (111500 to 128659) 17159 = 8.3%

 chorus2: Chorus (2:08.659) (128659 to 145830) 17171 = 8.4%

 bridge: Bridge (2:25.830) (145830 to 162954) 17124 = 8.3%

 chorus3: Chorus (2:42.954) (162954 to 180108) 17154 = 8.3%

 outro: Outro (3:00.108) (180108 to 206000) 25892 = 12.6%

--------------------------------------------------------

 total = 3:26.000 - 206000


 */