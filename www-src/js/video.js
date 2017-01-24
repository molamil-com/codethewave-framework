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
    var videoSource;

    var videoSpriteMask;
    var videoTextureMask;
    var videoSourceMask;

    var video;

    var mainContainer;

    var renderer;

    var videos;

    var loaded;

    this.init = function(PIXI, dom, container, _renderer, resolution, input, callback, muted, preload) {

        //

       // input.isTouchDevice = false;


        SPF.log("document.location.hostname", document.location.hostname);


        if(document.location.hostname == "192.168.0.13"){
           serverPath = "./";
        }


        if(document.location.hostname == "codethewave.com" ){
            // serverPath = "http://codethewave.com/";
            serverPath = "./";
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


        if(input.isTouchDevice){
            if(input.isTouchDevice[0] == "android"){
                $("#BPSPVideo").css({"position": "absolute", "display": "block", top: 0, left: 0, width: "100%", height:"100%"});
            }
        } else {
            $("#BPSPVideo").css({"position": "absolute", "display": "none", top: 0, left: 0, width: "100%", height:"100%"});
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

        videoSpriteMask = new PIXI.Sprite();
        videoSpriteMask.width = videoWidth;
        videoSpriteMask.height = videoHeight;
        videoSprite.y = 0;

        videoContainer = new PIXI.Container();
        videoContainer.addChild(videoSpriteMask);

    };

    this.create = function(PIXI, dom, container, _renderer, resolution, input, callback){



        videoRenderTexture = new PIXI.RenderTexture.create(videoWidth, videoHeight*input.resolution);
        videoMask = new PIXI.Sprite(videoRenderTexture);

        video.setAttribute('webkit-playsinline', 'webkit-playsinline');
        video.setAttribute('playsinline', 'playsinline');

        videoTexture = PIXI.Texture.fromVideo(video);

        videoSource = videoTexture.baseTexture.source;
        videoSource.crossOrigin = "anonymous";
        videoSource.loop = false;

        videoSprite.texture = videoTexture;
        videoSpriteMask.texture = videoTexture;

       videoSprite.mask = videoMask;

        var resolution = 1; // input.resolution;

        videoSprite.scale.set((1)/resolution);
        videoSpriteMask.scale.set((1)/resolution);

        mainContainer.addChild(videoSprite);
        mainContainer.addChild(videoMask);
        container.addChild(mainContainer);

        video.pause();

        if(callback != null){

            callback();
        }
    };

    this.render = function(realTime, input) {

        if(videoRenderTexture){

            if(realTime){
                renderer.render(videoContainer, videoRenderTexture);
            } else {
                videoTexture.baseTexture.autoUpdate = true;
                videoTexture.baseTexture.update();
                videoTexture.baseTexture.autoUpdate = false;

            }
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

        var w =  input.width;
        var h =  input.height;

        var resolution = 1; // input.resolution;

        if(videoSpriteMask) {

            if(input.resolution == 2 && input.isTouchDevice){
                videoSpriteMask.y = -(videoHeight/4);
            }else {
                videoSpriteMask.y = -(videoHeight/2);
            }

            mainContainer.width = ((w * ( h / w)) * (2));
            mainContainer.height = (h * 2) * resolution;


            if( mainContainer.width < w){

                var ratio = w/h;

                mainContainer.width = w;

                mainContainer.height = (h*resolution)*ratio;

            }

            mainContainer.position.x = ((w) / 2) - (mainContainer.width / 2);

            mainContainer.position.y = ((h*resolution) / 2)- (mainContainer.height / 4);

        }
    };

}


module.exports = Video;