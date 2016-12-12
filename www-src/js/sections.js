
var init = function(){

    var sections = [


        { "id":"intro", "label":"Intro", "label-min":"I", percentage:"3.3", starts:"0", ends:"6900" },

        { "id":"verse1", "label":"Verse I", "label-min":"V",percentage:"16.3", starts:"6900", ends:"41075" },

        { "id":"preChorus1", "label":"Pre Chorus", "label-min":"PC", percentage:"8.2", starts:"41075", ends:"58199" },

        { "id":"chorus1", "label":"Chorus",  "label-min":"C", percentage:"8.2", starts:"58199", ends:"75231" },

        { "id":"verse2", "label":"Verse II",  "label-min":"V", percentage:"16.3", starts:"75231", ends:"109480" },

        { "id":"preChorus2", "label":"Pre Chorus",  "label-min":"PC", percentage:"8.6", starts:"109480", ends:"126769" },

        { "id":"chorus2", "label":"Chorus",  "label-min":"C", percentage:"8.2", starts:"126769", ends:"143751" },

        { "id":"bridge", "label":"Bridge",  "label-min":"B", percentage:"8.2", starts:"143751", ends:"161000" },

        { "id":"preChorus3", "label":"Pre Chorus",  "label-min":"PC", percentage:"8.2", starts:"161000", ends:"178129" },

        { "id":"chorus3", "label":"Chorus",  "label-min":"C", percentage:"12.5", starts:"178129", ends:"203584" },

        { "id":"outro", "label":"O",  "label-min":"O", percentage:"2", starts:"203584", ends:"208000" }

    ];

    return sections;

};

module.exports = {

    init:init

};

/*

 00:00:000 verse1 = 0
 00:40:220 preChorus1 = 40220
 00:57:190 chorus1 = 57190
 01:14:160 verse2 = 58199
 01:48:100 preChorus2 = 108100
 02:05:190 chorus2 = 125190
 02:23:220 bridge = 143220
 02:40:000 preChorus3 = 160000
 02:56:220 choru3 = 176220
 03:14:140 outro = 194140


 --------------------------------------------------------

 intro 0:00.000 Intro: intro: 0 - 6900 =

 verse1 0:06.900 Verse 1: verse1: 6900 - 41075 =

 preChorus1 0:41.075 Pre Chorus: preChorus1: 41075 - 58199 =

 chorus1 0:58.199 Chorus: chorus1: 58199 - 75231 =

 verse2 1:15.231 Verse 2: verse2: 75231 - 109480 =

 preChorus2: 1:49.580 Pre Chorus: preChorus2: 109480 - 126769 =

 chorus2 2:06.769 Chorus: chorus2: 126769 - 143751 =

 bridge 2:23.751 Bridge: bridge: 143751 - 161000 =

 preChorus3 2:41.000 Pre Chorus: preChorus3: 161000 - 178129 =    NEW!!

 chorus3 2:58.129 Chorus x 2: chorus3: 178129 - 203584 =

 outro 3:23.584 End: end: 203584 - XXX =

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