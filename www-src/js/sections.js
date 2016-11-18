
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

 0:00.000 Intro: intro: 0 - 6900 =

 0:06.900 Verse 1: verse1: 6900 - 41075 =

 0:41.075 Pre Chorus: preChorus1: 41075 - 58199 =

 0:58.199 Chorus: chorus1: 58199 - 75231 =

 1:15.231 Verse 2: verse2: 75231 - 109480 =

 1:49.580 Pre Chorus: preChorus2: 109480 - 126769 =

 2:06.769 Chorus: chorus2: 126769 - 143751 =

 2:23.751 Bridge: bridge: 143751 - 161000 =

 2:41.000 Pre Chorus: preChorus3: 161000 - 178129 =

 2:58.129 Chorus x 2: chorus3: 178129 - 203584 =

 3:23.584 End: end: 203584 - XXX =

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