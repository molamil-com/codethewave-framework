
var $ = require('jquery');

var analytics = require('universal-ga');

var detectMediaSource = require('detect-media-element-source');

var createAudioContext = require('ios-safe-audio-context');

var createPlayer =  require('web-audio-player');

var createAnalyser = require('web-audio-analyser');

var createVideo = require("./js/video.js");

var createUI = require("./js/ui.js");

var fps = require('fps');


(function(exports) {

    // -- VARIABLES

    var version = 0.014;

    var serverPath = require("./js/serverPath.js").serverPath;

    var sections = require("./js/sections.js").init();

    var patterns;

    var graphics;

    var maskers;

    var colors = require("./js/colors.js").init(PIXI);

    var maskMidground = false;

    var ticker;

    var f = 0;

    var fpsPoor = false;

    var source;

    var ui;

    var title, firstName, lastName, tip;

    var isVideoReady;

    var audio;

    var isSite;

    var startId;

    var conf = {
            width: window.innerWidth,
            height: window.innerHeight,
            color: 0x000000,
            container: null
        },

        input = {
            n: 0
        },

        active = false,
        stage,
        domContainer,
        resolution,
        renderer,
        background,
        midground,
        foreground,
        videoground,
        backConf,
        midConf,
        foreConf,
        audio,
        audioUtil,
        analyser,
        video


    // -- SPF METHODS

    function init() {

        if (window.console && typeof window.console.log == "function")
            console.log("SP FRAMEWORK - ", version);

        input.width = getWindowCoords()[0];
        input.height = getWindowCoords()[1];

        patterns = require("./js/patterns.js").init(PIXI, input);
        graphics = require("./js/graphics.js").init(PIXI, input);
        maskers = require("./js/maskers.js").init(PIXI, input);

        // document.domain = "scarletpleasure.molamil.com";

        stage = new PIXI.Container();

        domContainer = conf.container || document.body;

        resolution = window.devicePixelRatio;

        renderer = PIXI.autoDetectRenderer(conf.width, conf.height, {
            antialiasing: false,
            transparent: false,
            backgroundColor: conf.color
        }, false);


        // Create the layers

        background = new PIXI.Container();
        midground = new PIXI.Container();
        videoground = new PIXI.Container();
        foreground = new PIXI.Container();

        stage.addChild(background);
        stage.addChild(midground);
        stage.addChild(videoground);
        stage.addChild(foreground);

        background.zIndex = 4;
        midground.zIndex = 3;
        videoground.zIndex = 2;
        foreground.zIndex = 0;

        //

        input.sections = sections;

        input.resolution = resolution;

        input.isTouchDevice = isTouchDevice();

        input.mouseTouchPosition = {x:0,y:0};

        input.orientation = {gamma:0, beta:0, alpha:0};

        SPF.log("resolution", resolution);

        SPF.log("isTouchDevice", input.isTouchDevice);


        if(input.isTouchDevice){

            domContainer.addEventListener("touchmove", function(e){

                input.mouseTouchPosition.x = e.touches[0].clientX;
                input.mouseTouchPosition.y = e.touches[0].clientY;

            }, true);

            window.addEventListener('deviceorientation',  orientationHandler, false);
            window.addEventListener('MozOrientation',     orientationHandler, false);
        }

        // TEXTURES

        input.patterns = patterns;

        input.graphics = graphics;

        input.maskers = maskers;

        input.colors = colors;

        input.dom = domContainer;

        input.frameRate = 25;

        //

        domContainer.appendChild(renderer.view);

        domContainer.updateLayersOrder = function () {
            stage.children.sort(function(a,b) {
                a.zIndex = a.zIndex || 0;
                b.zIndex = b.zIndex || 0;
                return b.zIndex - a.zIndex
            });
        };
        domContainer.updateLayersOrder();

        requestAnimationFrame(animate);

        $(window).resize(resize);

        window.onorientationchange = resize;

        resize();

        active = true;



    };

    function startFrontend(){

        isSite = true;
        startUI();

    };

    function startUI(){

        ui = new createUI();
        ui.init(domContainer, title, firstName, lastName, tip);

        video = new createVideo();

        video.init(PIXI, domContainer, videoground, renderer, resolution, input, function(){

            if(!isVideoReady){
                videoReady();
            }

        });

        video.create(PIXI, domContainer, videoground, renderer, resolution, input);

        resize();

        ticker = fps({
            every: 25
        });

        ticker.on('data', function(fps) {
            input.frameRate = Math.round(fps);
            SPF.log("input.frameRate ", input.frameRate );
        });

        foreground.visible = false;
    }

    function start(id){

        // CODE PEN VIEW FOR TESTING!

        analytics.initialize('UA-78613251-3');

        analytics.pageview('Start');

        analytics.pageview(window.location);

        startId = id;

        //

        startUI();

        //



        for(var i=0; i<sections.length; i++){

            var s = sections[i];

            var target = $("#BPSPUI-navigation").find(".section-"+i);

            target.data("starts",  s.starts);

            target.click(function(){

                playVideoAt($(this).data("starts"));

            });

        }


    };

    function playVideoAt(milli){

        var seconds = milli * 0.001;

        video.getVideoSource().currentTime = Math.round(seconds);

    }

    function videoReady(){


        isVideoReady = true;

        if(ui != null){
            ui.getVideoPlayButton().css("display","block");
            ui.display();
        }


        if ('ontouchstart' in document.documentElement) {

            domContainer.addEventListener("touchstart", function touchStart(){

                domContainer.removeEventListener("touchstart", touchStart, false);

                canPlay();

                $("#BPSPVideo").css({ "display": "none"});


            }, false);

        } else {


            canPlay();

        };

    };

    function canPlay(){


        var audioContext = createAudioContext();

        // GET POSITION FROM SELECTED SECTION OF THE SONG
        var currentTime = 0;

        if(startId != null){
            for(var i=0; i<sections.length; i++){
                var s = sections[i];
                if(s.id == startId){
                    currentTime = s.starts;
                    break;
                }
            }
        };

        playVideoAt(currentTime);
        video.getVideoSource().play();

        if(ui != null)
            ui.getVideoPlayButton().css("display","none");

        foreground.visible = true;

        input.audioContext = audioContext;

        detectMediaSource(function (supportsMediaElement) {

            var shouldBuffer =! supportsMediaElement;
            initAudio(audioContext, shouldBuffer);

        }, audioContext);


    };

    function initAudio(audioContext, shouldBuffer) {

        if ( isTouchDevice()) {

            audio = createPlayer(serverPath + "audio/TheWaveInstrumental.mp3", {
                crossOrigin: "anonymous",
                context: audioContext,
                buffer: shouldBuffer,
                loop:true
            });

            audioUtil = createAnalyser(audio.node, audio.context, {
                audible: false,
                stereo: false
            });

            audio.on('load', function () {
                SPF.log("AUDIO PLAY", "");
                analyser = audioUtil.analyser;
                input.audio = audioUtil;
                audio.play();
            });

        } else {

            var gainNode = audioContext.createGain();

            var mediaNode = audioContext.createMediaElementSource(video.getVideoSource());
            mediaNode.connect(gainNode);

            audioUtil = createAnalyser(gainNode, audioContext, {
                stereo: true,
                audible:true
            });

            analyser = audioUtil.analyser;

            input.audio = audioUtil;

        };

        //
        // START LISTENING TRACKS!
        //

        var videoElement = document.querySelector("video");

        var tracks = videoElement.textTracks;

        input.editing = null;
        var editingTrack = tracks[0]; // editing.vtt;

        // console.log("editingTrack: ",editingTrack.cues);

        editingTrack.oncuechange = function (){
            var cue = this.activeCues[0];
            if(cue) {
                var cueData = JSON.parse(cue.text);
                input.editing = cueData;
            } else {
                input.editing = null;
            }
            SPF.log("input.editing", JSON.stringify(input.editing));
        };

        //

        input.cast = null;
        var castTrack = tracks[1]; // cast.vtt;

        // console.log("castTrack: ",castTrack.cues);

        castTrack.oncuechange = function (){


            var cue = this.activeCues[0];
            if(cue) {
                var cueData = JSON.parse(cue.text);
                input.cast = cueData;
            } else {
                input.cast = null;
            }
            SPF.log("input.cast", JSON.stringify(input.cast));
        };

        //

        input.beat = null;
        var beatTrack = tracks[2]; // beat.vtt;

        // console.log("beatTrack: ",beatTrack.cues);

        beatTrack.oncuechange = function (){
            var cue = this.activeCues[0];
            if(cue) {
                var cueData = JSON.parse(cue.text);
                input.beat = cueData;
            } else {
                input.beat = null;
            }
            SPF.log("input.beat", JSON.stringify(input.beat));
        };


        input.styling = null;
        var stylingTrack = tracks[3]; // styling.vtt;

        // console.log("stylingTrack: ",stylingTrack.cues);

        stylingTrack.oncuechange = function (){
            var cue = this.activeCues[0];
            if(cue) {
                var cueData = JSON.parse(cue.text);
                input.styling = cueData;
            } else {
                input.styling = null;
            }
            SPF.log("input.styling", JSON.stringify(input.editing));
        };

        //

        resize();

    };

    function resize(){

        input.width =  getWindowCoords()[0];
        input.height = getWindowCoords()[1];

        stage.hitArea = new PIXI.Rectangle(0, 0,  input.width, input.height);

        SPF.log("input.width", input.width);

        SPF.log("input.height", input.height);

        if (active) {


            renderer.resize( input.width,  input.height);

            if (foreConf && typeof foreConf.resize == 'function') {
                try {
                    foreConf.resize(PIXI, input);
                } catch(error){

                }
            };

            if (midConf && typeof midConf.resize == 'function') {
                try {
                    midConf.resize(PIXI, input);
                } catch(error){

                }
            };

            if (backConf && typeof backConf.resize == 'function') {
                try {
                    backConf.resize(PIXI, input);
                } catch(error){

                }
            };

            if(ui != null)
                ui.resize(input);

            if(video != null)
                video.resize(input);

            window.scrollTo(0, 0);
        };


    };

    function animate() {

        if(ticker){
            ticker.tick();
        }

        if (active) {

            if(!input.isTouchDevice){
                input.mouseTouchPosition =  renderer.plugins.interaction.mouse.global;
            }

            // SPF.log("mouseTouchPosition.x", input.mouseTouchPosition.x);
            // SPF.log("mouseTouchPosition.y", input.mouseTouchPosition.y);

            if (foreConf && typeof foreConf.render == 'function') {
                try {
                    foreConf.render(PIXI, input);
                } catch(error){

                }
            };

            if (midConf && typeof midConf.render == 'function') {
                try {
                    midConf.render(PIXI, input);
                } catch(error){

                };
            };

            if (backConf && typeof backConf.render == 'function') {
                try {
                    backConf.render(PIXI, input);
                } catch(error){

                };
            };


            if(isTouchDevice()){
                if(input.frameRate < 18) {
                    fpsPoor = true;
                    SPF.log("fpsPoor", fpsPoor);
                };

                if(video != null){
                    if(fpsPoor){
                        if(f%10 ==0){
                            video.render(false, input);
                        } else {
                            video.render(true, input);
                        }
                    } else {
                        video.render(true, input);
                    };
                };

                f++;

                if(f>= 60){
                    f=0;
                };
            } else {
                if(video)
                    video.render(true, input);
            }

            if(ui != null)
                ui.render(video.getPositionPercentage());


            if(audio)
                if(video)
                    audio.currentTime = video.getVideoSource().currentTime;

            renderer.render(stage);

            requestAnimationFrame(animate);
        };

    };

    function set(conf) {

        var vContainer;

        if (conf.at == 'fore') {
            vContainer = foreground;
            foreConf = conf;
        } else if (conf.at == 'mid') {
            vContainer = midground;
            midConf = conf;
        } else {
            vContainer = background;
            backConf = conf;
        }

        vContainer.removeChildren(); // TODO: Check that they get destroyed

        input.container = vContainer; // TODO: Check that we cleanup the containers for render

        if (typeof conf.load == 'function') {

            var texturesToLoad = conf.load.call(window, PIXI, input);

            var loader = new PIXI.loaders.Loader();

            for(var i=0; i < texturesToLoad.length; i++){
                loader.add("texture-"+i, texturesToLoad[i].baseTexture.imageUrl);
            }

            loader.once('complete',function(){
                resize();
            });

            loader.load();
        }

        if (typeof conf.init == 'function') {
            conf.init.call(window, PIXI, input);
        }

        var manager = new PIXI.interaction.InteractionManager(stage, renderer.view);

        stage.interactive = true;


        stage.on('mousedown', function(){
            mouseDownTouchStart();
        });

        stage.on('touchstart', function(){
            mouseDownTouchStart();

        });

        stage.on('mouseup', function(){
            mouseUpTouchEnd();
        });

        stage.on('touchend', function(){
            mouseUpTouchEnd();
        });

        if (conf.at == 'fore') {

            stage.mouseover = function(ev) {
                mouseOver();
            }

            stage.mouseout = function(ev) {
                mouseOut();
            }

        };

        input.width = getWindowCoords()[0];
        input.height = getWindowCoords()[1];

    };

    function info(conf){

        title = conf.title;

        firstName = conf.firstName;

        lastName = conf.lastName;

        tip = conf.tip;

        $("#SPFDebug").css("display","none");
        if(Boolean(conf.debug))
            $("#SPFDebug").css("display","block");

        if(isSite == true){
            ui.update(domContainer, title, firstName, lastName, tip, conf.number);
        };

    };

    function midgroundMask(value){


        maskMidground = value;

        if(video == null || video.getVideoSource() == null){
            setTimeout(function(){
                midgroundMask(maskMidground);
            },1000);
            return;
        }


        if(maskMidground){
            if(midground.zIndex != 1){
                midground.mask = video.getVideoMask();
                midground.zIndex = 1;
                domContainer.updateLayersOrder();
            }
        } else {
            if(midground.zIndex == 1){
                midground.mask = false;
                midground.zIndex = 3;
                domContainer.updateLayersOrder();

                video.getVideoSprite().mask = video.getVideoMask();
            }
        };


    };

    function fullscreenSprite(container, texture){

        var sprite = new PIXI.Sprite(texture, 0, 0);

        sprite.anchor.set(0.5);
        container.addChild(sprite);

        $(window).resize(function(){
            updateFullscreenSprite(sprite);
        });

        updateFullscreenSprite(sprite);

        return sprite;

    };

    function updateFullscreenSprite(sprite){

        var w = getWindowCoords()[0];
        var h = getWindowCoords()[1];

        sprite.scale = new PIXI.Point(1,1);

        var ratio = w/h;

        var width = w;
        var height = h*ratio;

        if(w <h){
            ratio = h/w;
            height = h;
            width = w*ratio;
        };

        sprite.width = width;
        sprite.height = height;

        sprite.position.x = w/2;
        sprite.position.y = h/2;

    };

    // UTILS

    function getVideoSprite(){

        return video.getVideoSprite();
    };

    function orientationHandler(event){

        input.orientation.gamma = Math.round(event.gamma);
        input.orientation.beta = Math.round(event.beta);
        input.orientation.alpha = Math.round(event.alpha);

        SPF.log("input.orientation.gamma", input.orientation.gamma);
        SPF.log("input.orientation.beta", input.orientation.beta);
        SPF.log("input.orientation.alpha", input.orientation.alpha);

    };

    function mouseDownTouchStart(){

        try {

            if (foreConf && typeof foreConf.mouseDownTouchStart == 'function') {
                foreConf.mouseDownTouchStart(PIXI, input);
            };

            if (midConf && typeof midConf.mouseDownTouchStart == 'function') {
                midConf.mouseDownTouchStart(PIXI, input);
            };

            if (backConf && typeof backConf.mouseDownTouchStart == 'function') {
                backConf.mouseDownTouchStart(PIXI, input);
            };

        } catch(error){

        };

    };

    function mouseUpTouchEnd(){

        try {

            if (foreConf && typeof foreConf.mouseUpTouchEnd == 'function') {
                foreConf.mouseUpTouchEnd(PIXI, input);
            };


            if (midConf && typeof midConf.mouseUpTouchEnd == 'function') {
                midConf.mouseUpTouchEnd(PIXI, input);
            };

            if (backConf && typeof backConf.mouseUpTouchEnd == 'function') {
                backConf.mouseUpTouchEnd(PIXI, input);
            };

        } catch(error){

        };

    };


    function mouseOver(){


        try {

            if (foreConf && typeof foreConf.mouseOver == 'function') {
                foreConf.mouseOver(PIXI, input);
            };

        } catch(error){

        };

    };

    function mouseOut(){

        try {

            if (foreConf && typeof foreConf.mouseOut == 'function') {
                foreConf.mouseOut(PIXI, input);
            };

        } catch(error){

        };

    };

    function getWindowCoords() {

        if(isSafari()){
            return [(document.documentElement.clientWidth || document.body.clientWidth || document.body.scrollWidth),
                (document.documentElement.clientHeight || document.body.clientHeight || document.body.scrollHeight)];
        }

        if (window.innerWidth || window.innerHeight ) {

            return [window.innerWidth, window.innerHeight];

        } else {

            return [(document.documentElement.clientWidth || document.body.clientWidth || document.body.scrollWidth),
                (document.documentElement.clientHeight || document.body.clientHeight || document.body.scrollHeight)];
        }
    };

    function isSafari() {
        var ua = navigator.userAgent.toLowerCase();

        if (ua.indexOf('safari') != -1) {
            if (ua.indexOf('chrome') > -1) {
                return false;
            } else {
                return true;
            }
        }
    };

    function isTouchDevice() {

        var deviceAgent = navigator.userAgent.toLowerCase();
        var isTouchDevice = (

        deviceAgent.match(/(iphone|ipod|ipad)/) ||
        deviceAgent.match(/(android)/)  ||
        deviceAgent.match(/(iemobile)/) ||
        deviceAgent.match(/iphone/i) ||
        deviceAgent.match(/ipad/i) ||
        deviceAgent.match(/ipod/i) ||
        deviceAgent.match(/blackberry/i) ||
        deviceAgent.match(/bada/i)

        );

        return isTouchDevice;
    }

    // -- EXPORTS


    exports.SPF = {
        set: set,
        info:info,
        start:start,
        startFrontend:startFrontend,
        getVideoSprite:getVideoSprite,
        mouseDownTouchStart:mouseDownTouchStart,
        midgroundMask:midgroundMask,
        fullscreenSprite:fullscreenSprite,
        log: require("./js/DebugConsole.js")
    };


    // -- INIT

    init();

})(window);
