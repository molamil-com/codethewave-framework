var $ = require('jquery');

var makeVideoPlayableInline = require('iphone-inline-video');

function Video() {

    var serverPath = require("./serverPath.js").serverPath;

    var videoWidth = 960;
    var videoHeight = 1080;

    var videoRenderTexture;
    var videoContainer;
    var videoContainer2;
    var videoMask;

    var videoSprite;
    var videoTexture;
    var videoTexture1;
    var videoTexture2;
    var videoSource;

    var videoSpriteMask;
    var videoTextureMask;
    var videoSourceMask;

    var ratio;

    var video;

    var $video;

    var mainContainer;

    var renderer;

    var videos;

    var loaded;


    this.init = function(PIXI, dom, container, _renderer, resolution, input, callback, muted, preload) {


       // input.isTouchDevice = false;


        SPF.log("document.location.hostname", document.location.hostname);


        if(document.location.hostname == "192.168.0.13"){
           serverPath = "./";
        }


        if(document.location.hostname == "codethewave.com" ){
            serverPath = "http://codethewave.com/";
            // serverPath = "./";
        }

        if(String(document.location.pathname).indexOf("examples") >=1){
            serverPath = "../";
        }


        SPF.log("serverPath", serverPath);

        // CREATE VIDEO ELEMENTS

        /*
        final-chroma02-w480-h270.mp4
        final-chroma02-w960-h540.mp4
        final-chroma02-w1280-h720.mp4
        final-chroma02-w1920-h1080.mp4
        */

        if(document.location.hostname.indexOf("codepen") >=1 && navigator.userAgent.search("Firefox") ){

            videos = [
                {file:"final-chroma02-w480-h270.mp4", width:480, height:540},
                {file:"final-chroma02-w960-h540.mp4", width:960, height:1080}
            ];

        } else {

            videos = [
                {file:"final-chroma02-w480-h270.mp4", width:480, height:540},
                {file:"final-chroma02-w960-h540.mp4", width:960, height:1080},
                {file:"final-chroma02-w1280-h720.mp4", width:1280, height:1440},
                {file:"final-chroma02-w1920-h1080.mp4", width:1920, height:2160}
            ];

        }


        if(SPF.isTouchDevice() == "ios"){
            videos = [
                {file:"final-chroma02-w480-h270.mp4", width:480, height:540}
            ];
        }



        var selectedVideo = videos[0];

        for(var i=0;i<videos.length;i++){

            var v = videos[i];

            if (input.isTouchDevice) {

                if(input.width/2 >= v["width"] ){
                    selectedVideo = v;}


            } else {
                if(input.width >= v["width"] ){
                    selectedVideo = v;
                }
            }

        }

        var videoPath = serverPath+"video/"+selectedVideo["file"];

        videoWidth = selectedVideo["width"];
        videoHeight = selectedVideo["height"];

        SPF.log("videoPath", videoPath);

        if (window.console && typeof window.console.log == "function"){
            console.log(videoPath);
        }

        /*
        console.log("videos: ", videos);
        console.log("input.width",input.width);
        console.log("selectedVideo", JSON.stringify(selectedVideo));
        console.log("videoPath", videoPath);
        */

        video = '<video crossOrigin="anonymous" id="BPSPVideo" controls autobuffer loop autoplay webkit-playsinline playsinline>';

        if(preload){
            video = '<video crossOrigin="anonymous" id="BPSPVideo" controls autobuffer loop autoplay webkit-playsinline playsinline preload="auto">';
        }

        video += '<source src="' + videoPath + '" > ';

        video += '<track kind="metadata" label="editing" src="' + serverPath + 'tracks/editing.vtt" default>';
        video += '</track>';

        video += '<track kind="metadata" label="cast" src="' + serverPath + 'tracks/cast.vtt" default>';
        video += '</track>';

        video += '<track kind="metadata" label="beat" src="' + serverPath + 'tracks/beat.vtt" default>';
        video += '</track>';

        video += '<track kind="metadata" label="styling" src="' + serverPath + 'tracks/styling.vtt" default>';
        video += '</track>';

        video += '<track kind="metadata" label="pulse" src="' + serverPath + 'tracks/pulse.vtt" default>';
        video += '</track>';

        video += '</video>';

        $(dom).append(video);

        $video = $("#BPSPVideo");

        if(input.isTouchDevice && input.isTouchDevice[0] == "android"){
            $video.css({"position": "absolute", "display": "block", top: 0, left: -videoWidth, width: videoWidth, height:videoHeight});

        } else {
            $video.css({"position": "absolute", "display": "none", top: 0, left: 0, width: "100%", height:"100%"});
        }

        video = document.getElementById('BPSPVideo');

        video.setAttribute('crossOrigin', 'anonymous');

        if(video != null){

            if(document.location.pathname.indexOf("/fullcpgrid/") > 1 || muted) {
                video.volume = 0;
            } else {
                video.volume = 1;
            }
        }


        var callbackCalled = false;

        video.oncanplay = function() {
            if(!callbackCalled)
                callback();
            callbackCalled = true;
        };

        // FOR SAFARI
        video.oncanplaythrough = function() {
            if(!callbackCalled)
                callback();
            callbackCalled = true
        };

        renderer = _renderer;

        /*
        if (input.isTouchDevice) {
            videoWidth = Math.ceil(videoWidth / 2);
            videoHeight = Math.ceil(videoHeight / 2);
        }
        */

        // CREATE PIXI TEXTURES

        mainContainer = new PIXI.Container();

        videoSprite = new PIXI.Sprite();
        videoSprite.width = videoWidth;
        videoSprite.height = videoHeight;
        videoSprite.y = 0;

        videoSpriteMask = new PIXI.Sprite();
        videoSpriteMask.width = videoWidth;
        videoSpriteMask.height = videoHeight;
        videoSpriteMask.y = 0;

        videoContainer = new PIXI.Container();
        videoContainer.addChild(videoSpriteMask);

    };

    this.create = function(PIXI, dom, container, _renderer, resolution, input, callback){


        videoRenderTexture = new PIXI.RenderTexture.create(videoWidth, videoHeight);
        videoMask = new PIXI.Sprite(videoRenderTexture);

        video.setAttribute('webkit-playsinline', 'webkit-playsinline');
        video.setAttribute('playsinline', 'playsinline');

        videoTexture1 = PIXI.Texture.fromVideo(video);

        videoTexture2 = PIXI.Texture.fromVideo(video);

        videoSource = videoTexture1.baseTexture.source;
        videoSource.crossOrigin = "anonymous";
        videoSource.loop = false;

        videoSprite.mask = videoMask;

        mainContainer.addChild(videoSprite);
        mainContainer.addChild(videoMask);

        container.addChild(mainContainer);


        videoSprite.texture = videoTexture1;
        videoSpriteMask.texture = videoTexture2;

        video.pause();

        if(callback != null){
            callback();
        }

    };

    this.stopMotion = function(){
        videoTexture1.baseTexture.autoUpdate = false;
        videoTexture2.baseTexture.autoUpdate = false;
    };

    this.render = function(input) {


        if(videoRenderTexture && video){
            videoTexture1.baseTexture.update();
            videoTexture2.baseTexture.update();
            renderer.render(videoContainer, videoRenderTexture);
        }

    };

    this.getVideoSprite = function(){
        return videoSprite;
    };

    this.getVideoMask = function(){
        return videoMask;
    };

    this.getVideoSource = function(){
        return video;
    };

    this.getPositionPercentage = function(){
        return  (100/video.duration)*video.currentTime;
    };

    this.getLoaded = function(){
        return loaded;
    }

    this.resize = function(input){


        videoSpriteMask.position.y = -(videoHeight/2);


        var w =  input.width;
        var h =  input.height;

        if(videoSpriteMask) {


            mainContainer.width =  w;
            ratio = w/videoWidth;

            mainContainer.height = (videoHeight)*ratio;

            if(mainContainer.height < h*2) {
                mainContainer.height = h*2;
                ratio = (h*2)/(videoHeight);
                mainContainer.width = videoWidth*ratio;
            }

            mainContainer.position.x = w/2  - mainContainer.width/2;
            mainContainer.position.y = h/2 -  mainContainer.height/4;


        }


    };

}


module.exports = Video;