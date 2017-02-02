var $ = require('jquery');

var sections = require("./sections.js").init();

var serverPath = require("./serverPath.js").serverPath;

var screenOrientation = require('screen-orientation');


function Ui() {

    var uiContainer;

    var uiNavigation;

    var playHead, playHeadTail;

    this.update = function(dom, title, firstName, lastName, tip, number) {

        if(!title)
            title = "";

        if(!firstName)
            firstName = "";

        if(!lastName)
            lastName = "";

        if(!tip ) {
            tip = "";
        }

        if(!number)
            number = "00";


        uiContainer = $('#BPSPUI');
        uiContainer.find(".info").remove();

        var info = '<div class="info">';
        info += '<div class="title">'+title+'</div>';

        if(tip !=""){
            info += '<div class="tip">'+tip+'</div>';
        }

        uiContainer.append(info);

        uiContainer.find(".top-circle").find(".label").html(firstName.toUpperCase().slice(0,1)+lastName.toUpperCase().slice(0,1));

        uiContainer.find(".top-diamond").find(".label").html(number);


    };

    this.init = function(dom, title, firstName, lastName, tip, number) {

        $(dom).append('<div id="BPSPUI"></div>');
        $(dom).append('<div id="BPSPUI-navigation"></div>');

        uiContainer = $('#BPSPUI');
        uiNavigation = $('#BPSPUI-navigation');

        uiContainer.css("display","none");
        uiNavigation.css("display","none");

        var o = '<div class="orientation"><div class="message">';

        var iconPath = serverPath + "svg/PS_graphic_phone.svg";

        o += '<svg class="svg" width="74" height="134" viewBox="0 0 74 134" preserveAspectRatio><image xlink:href='+iconPath+' width="74" height="134"/></svg> ';

        o += "<br><br><br>";

        o += 'Portrait mode not supported, please turn your device to landscape for best view.</div></div>';
        uiContainer.append(o);

        var videoPlayButton = '<div class="video-play-button"></div>';
        uiContainer.append(videoPlayButton);

        var lineLeft = '<div class="line-left"></div>';
        uiContainer.append(lineLeft);

        var lineRight = '<div class="line-right"></div>';
        uiContainer.append(lineRight);

        var topCircle = '<div class="top-circle"><div class="icon"></div><p class="label">00</p></div>';
        uiContainer.append(topCircle);

        var topDiamond = '<div class="top-diamond"><div class="icon"></div><p class="label">00</p></div>';
        uiContainer.append(topDiamond);

        var topLineLeft = '<div class="top-line-left"></div>';
        uiContainer.append(topLineLeft);

        var topLineCenter = '<div class="top-line-center"></div>';
        uiContainer.append(topLineCenter);

        var topLineRight = '<div class="top-line-right"></div>';
        uiContainer.append(topLineRight);

        var bottomLineLeft = '<div class="bottom-line-left"></div>';
        uiContainer.append(bottomLineLeft);

        var bottomLineRight = '<div class="bottom-line-right"></div>';
        uiContainer.append(bottomLineRight);

        var bottomLineLeftVertical = '<div class="bottom-line-left-vertical"></div>';
        uiContainer.append(bottomLineLeftVertical);

        var bottomLineRightVertical = '<div class="bottom-line-right-vertical"></div>';
        uiContainer.append(bottomLineRightVertical);

        var info = '<div class="info">';

        info += '<div class="title"></div>';
        info += '<div class="tip"></div>';

        uiContainer.append(info);

        var navigation = '<div class="navigation">';
        navigation += '<ul>';

        for(var i=0; i<sections.length;i++){

            var section = sections[i];

            // section["percentage"] = 10;

            navigation += '<li class="section-'+i+'" style="width:'+section["percentage"]+'%">';

            navigation += '<table>';
            navigation += '<tr>';
            navigation += '<td class="side left"><div class="line"></div></td>';
            navigation += '<td class="label">'
            navigation += '<a class="text">'+section["label"]+'</a>';
            navigation += '</td>'
            navigation += '<td class="side right"><div class="line"></div></td>';
            navigation += '</tr>';
            navigation += '</table>';

            navigation += '</li>';

        };

        navigation += '</ul>';


        navigation += '<div class="play-head"></div>';
        navigation += '<div class="play-head-tail"></div>';


        navigation += "<div>";
        uiNavigation.append(navigation);

        var style = serverPath + "BPSPUI.css";

        $(dom).append('<link href="'+style+'" rel="stylesheet" type="text/css" />');

        playHead =  uiNavigation.find(".play-head");
        playHeadTail = uiNavigation.find(".play-head-tail");

        this.update(dom, title, firstName, lastName, tip, number);

    };


    this.getVideoPlayButton = function(){
        return uiContainer.find(".video-play-button");
    };


    this.render = function(position){
        playHead.css("left", position+"%");
        playHeadTail.css("left", position+"%");
    };

    this.resize = function(input){

        if(screenOrientation().direction != "landscape" && input.isTouchDevice ) {
            uiContainer.find(".orientation").css("display", "block");
            setTimeout(function(){
                uiContainer.find(".orientation").find("svg").addClass("tilt-phone");
            },1000);
        } else {

            uiContainer.find(".orientation").css("display", "none");
            setTimeout(function(){
                uiContainer.find(".orientation").find("svg").removeClass("tilt-phone");
            },1000);
        };

        var w =  input.width;
        var h =  input.height;

        var left =  parseInt(uiNavigation.find(".navigation").css("left"));

        uiContainer.find(".top-line-left").css("width",(w/2)-(left/2)-36);
        uiContainer.find(".top-line-right").css("width",(w/2)-(left/2)-36-2);

        var playerWidth = (w-left-left+1).roundTo(2);

        uiNavigation.find(".navigation").css("width", playerWidth);

        uiContainer.find(".info").css("width", playerWidth);

        var i = 0;
        uiNavigation.find(".navigation").find(".text" ).each(function( index ) {
            var section = sections[i];
            $(this).html(section["label"]);
            if(w < 1280){
                $(this).html(section["label-min"]);
            }
            if(w < 600){
                $( this ).html("•");
            }
            i++;

        });

    };

    this.display = function(){

        uiContainer.css("display","block");
        uiNavigation.css("display","block");
    };

    Number.prototype.roundTo = function(num) {
        var resto = this%num;
        if (resto <= (num/2)) {
            return this-resto;
        } else {
            return this+num-resto;
        }
    }


};

module.exports = Ui;