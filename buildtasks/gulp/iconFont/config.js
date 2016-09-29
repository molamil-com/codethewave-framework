/**
 * Created by thomasspringborg on 30/08/15.
 */



var config = require('../../../config.js');

var iconSrc = '/iconfont';
var settings = {
    fontDir: '/fonts',
    name: 'iconFont',
    src: config.build.src +iconSrc+'/*.svg',
    dest: config.build.dev + '/fonts',
    destProd: config.build.prod + '/fonts',
    destDev: config.build.prod + '/fonts',
    sassDest: config.build.src + iconSrc,
    template: './buildtasks/gulp/iconFont/template.scss.swig',
    sassOutputName: '_icons.scss',
    fontPath: 'fonts',
    className: 'icon',
    options: {
        fontName: config.build.fontName,
        appendCodepoints: true,
        normalize: false
    }
}
module.exports = settings;