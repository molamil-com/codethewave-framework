
var init = function(){

    var sections = [


        { "id":"intro", "label":"Intro", "label-min":"I", percentage:"2.4", starts:"0", ends:"5120" },

        { "id":"verse1", "label":"Verse I", "label-min":"V", percentage:"17", starts:"5120", ends:"40220" },

        { "id":"preChorus1", "label":"Pre Chorus I", "label-min":"PC", percentage:"8.2", starts:"40220", ends:"57190" },

        { "id":"chorus1", "label":"Chorus I", "label-min":"C", percentage:"8.2", starts:"57190", ends:"74160" },

        { "id":"verse2", "label":"Verse II", "label-min":"V", percentage:"16.3", starts:"74160", ends:"108100" },

        { "id":"preChorus2", "label":"Pre Chorus II", "label-min":"PC", percentage:"8.2", starts:"108100", ends:"125190" },

        { "id":"chorus2", "label":"Chorus II", "label-min":"C", percentage:"8.6", starts:"125190", ends:"143220" },

        { "id":"bridge", "label":"Bridge", "label-min":"B", percentage:"8.1", starts:"143220", ends:"160000" },

        { "id":"preChorus3", "label":"Pre Chorus III", "label-min":"PC", percentage:"7.8", starts:"160000", ends:"176220" },

        { "id":"chorus3", "label":"Chorus III", "label-min":"C", percentage:"8.6", starts:"176220", ends:"194140" },

        { "id":"outro", "label":"Outro", "label-min":"O", percentage:"6.6", starts:"194140", ends:"208000" }


    ];

    return sections;

};

module.exports = {

    init:init

};

/*





 00:00:000 intro = 0
 00:05:120 verse1 = 5120
 00:40:220 preChorus1 = 40220
 00:57:190 chorus1 = 57190
 01:14:160 verse2 = 74160
 01:48:100 preChorus2 = 108100
 02:05:190 chorus2 = 125190
 02:23:220 bridge = 143220
 02:40:000 preChorus3 = 160000
 02:56:220 choru3 = 176220
 03:14:140 outro = 194140



 00:00:00 Verse
 00:40:22 Pre Chorus
 00:57:19 Chorus
 01:14:16 Verse
 01:48:10 Pre Chorus
 02:05:19 Chorus
 02:23:22 Bridge
 02:40:00 Pre Chorus
 02:56:22 Chorus
 03:14:14 Outro

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

 total = 3:28.000 - 208000



 */



