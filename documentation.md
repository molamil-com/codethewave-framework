# CodeTheWave Framework Documentation

SPFramework is a small framework to help digital artists to collaborate in the creation of an unique interactive video reactive experience for Scarlet Pleasure with the supoort of B&O Play.

Library is located at http://scarletpleasure.molamil.com/sp-framework.js


## Table of Contents

* [How it works](#how-it-works)
* [A few rules to follow to improve your chances of having your graphics selected](#a-few-rules-to-follow-to-improve-your-chances-of-having-your-graphics-selected)
* [How to create a visual](#how-to-create-a-visual)
* [Framework functions](#framework-functions)
    * [SPF.set({...})](#spfset)
        * [Property: at (String)](#property-at-string)
        * [Function: load(PIXI, input)](#function-loadpixi-input)
        * [Function: init(PIXI, input)](#function-initpixi-input)
        * [Function: render(PIXI, input)](#function-renderpixi-input)
        * [Function: resize(PIXI, input)](#function-resizepixi-input)
        * [Function: mouseDownTouchStart (PIXI, input)](#function-mousedowntouchstart-pixi-input)
        * [Function: mouseUpTouchEnd (PIXI, input)](#function-mouseuptouchend-pixi-input)
        * [Function: mouseOver (PIXI, input)](#function-mouseover-pixi-input)
        * [Function: mouseOut (PIXI, input)](#function-mouseout-pixi-input)
    * [SPF.info({...})](#spfinfo)
    * [Input Object](#input-object)
        * [input.dom](#inputdom)
        * [input.container](#inputcontainer)
        * [input.resolution](#inputresolution)
        * [input.width](#inputwidth)
        * [input.height](#inputheight)
        * [input.frameRate](#inputframerate)
        * [input.patterns](#inputpatterns)
        * [input.maskers](#inputmaskers)
        * [input.graphics](#inputgraphics)
        * [input.colors](#inputcolors)
        * [input.isTouchDevice](#inputistouchdevice)
        * [input.orientation](#inputorientation)
        * [input.mouseTouchPosition](#inputmousetouchposition)
        * [input.audio](#inputaudio)
        * [input.sections](#inputsections)
        * [input.currentSection](#inputcurrentsection)
        * [input.editing](#inputediting)
        * [input.cast](#inputcast)
        * [input.beat](#inputbeat)
        * [input.styling](#inputstyling)
    * [Helpers](#helpers)
        * [midgroundMask](#midgroundmask)
        * [fullscreenSprite](#fullscreensprite)


## How it works

You can create graphics for 3 layers of that will be merged together with the video as follows:

* Background (editable visual layer)
* Midground (editable visual layer)
* Video (fixed layer)
* Foreground (editable visual layer)
* UX (fixed layer)

Midground layer also has the capability of being masked by the band's video if and when the artist decides to do it.

The framework will provide a number graphics, inputs and metadata for you to be able to quickly start building your own SPVisual.

We are using PIXI as the main engine for drawing graphics into canvas but if you prefer to do you own thing on a separate canvas you can of course do and use PIXI for drawing that canvas.


## A few rules to follow to improve your chances of having your graphics selected

* Visuals should always have at least a background layer.
* Some visuals works best when some of the graphics react to the sound.
* Visuals reacting to user input are held in high regard so each experience is unique.


## How to create a visual


### 1. Include the library (sp-framework.js)


### 2. Create a background layer:

```javascript
SPF.set({
    at:"back"
});
```

### 3. Preload the assets you want to use in your visual:

```javascript
SPF.set({
    at: "back",
    load: function(PIXI, input) {
        return [input.patterns.botanicorganic1, input.maskers.handdrawnanimal1]; //  array of: patterns, maskers or graphics
    }
});
```

### 4. Create the methods you need to use to create your magic:

Set the methods you need to use to create your magic:

```javascript
SPF.set({
    at: "back",
    load: function(PIXI, input) {
        return [input.patterns.botanicorganic1, input.maskers.handdrawnanimal1]; //  array of: patterns, maskers or graphics
    },
    init: function(PIXI, input) {
        //  Draw you graphics in PIXI adding them to input.container
    },
    render: function(PIXI, input) {
        //  Change you graphics using all the data sent on input
    },
    resize: function(PIXI, input, width, height) {
        // Make sure your graphics always works on all screen sizes including mobile and tablets.
    }
});
```

### 5. Now follow steps 2, 3 and 4 again for the "mid" and "fore" layers

Remember to change _at: "back"_ to _at: "mid"_ and _at: "fore"_.


### 6. Add information about your visual:


```javascript
SPF.info({
    debug: true, // boolean
    tip: "Use your mouse to create particles", // description on how to interact with your visual
    firstName: "Ramiro",
    lastName: "Espada"
    section: "s1" // id of the section of the song this visual is preferable prepared for.
});
```

### 7. Start the framework to test it all together!

```javascript
SPF.start();
```

## Framework functions

All example code for functions and properties below are all from a single example. You can see the full example here: [http://codepen.io/codethewave/pen/EgQavq](http://codepen.io/codethewave/pen/EgQavq) to see the below examples in context.

The following variables are defined in the global scope for example code below:

```javascript

// Background layer
var tilingSpriteBack2;
var tilingSpriteBack;
var tilingSpriteBackMask;

// Middle layer
var tilingSpriteMid;

// Foreground layer
var foreContainer, foreLeft, foreRight;
var foreCircleContainer;
var mf, f, fs;
var text;
```

### SPF.set({...})

Inside SPF.set the following properties and functions are available:


====


#### Property: at (String)

This property determines in which layer your script will run. The valid values are:

* back
* mid
* fore

```javascript
SPF.set({
    at: "back"
});
```

====


#### Function: load(PIXI, input)

This function preloads assets for use in the visual. By specifying the needed assets load-time is optimized compared to loading all available assets.

This function should always return an array.

```javascript
SPF.set({
    load: function(PIXI, input) {
        return [input.patterns.botanicorganic2, input.patterns.botanicorganic1, input.maskers.botanicorganic2];
    }
});
```

====


#### Function: init(PIXI, input)

This function is called once when your visual is ready to execute. This is where you setup your graphics in PIXI and add them to the input.container.

```javascript
SPF.set({
    init: function(PIXI, input) {
        tilingSpriteBack2 = new PIXI.extras.TilingSprite(input.patterns.botanicorganic1, 1, 1);
        tilingSpriteBack2.anchor.set(0);
        input.container.addChild(tilingSpriteBack2);

        tilingSpriteBack = new PIXI.extras.TilingSprite(input.patterns.botanicorganic2, 1, 1);
        tilingSpriteBack.anchor.set(0);
        input.container.addChild(tilingSpriteBack);

        tilingSpriteBackMask = SPF.fullscreenSprite(input.container, input.maskers.botanicorganic2);
        tilingSpriteBack.mask = tilingSpriteBackMask;
    }
});
```

====


#### Function: render(PIXI, input)

This function is called everytime your graphics is drawn. This is where you manipulate the graphics you setup in the init function.

```javascript
SPF.set({
    render: function(PIXI, input) {
        
        // Only rotate tilingSpriteBackMask if frameRate is not poor.
        if(input.frameRate >30){
            tilingSpriteBackMask.rotation += 0.1;
        }

        //  Change the size of the background based on the camera editing
        if(input.editing != null){
            if (input.editing.id == "close") {
                tilingSpriteBack2.scale.set(4);
                tilingSpriteBack.scale.set(4);
            }
            else if (input.editing.id == "medium") {
                tilingSpriteBack2.scale.set(3);
                tilingSpriteBack.scale.set(3);
            }
            else if (input.editing.id == "full") {
                tilingSpriteBack2.scale.set(2);
                tilingSpriteBack.scale.set(2);
            }
        }
        else {
            tilingSpriteBack2.scale.set(1);
            tilingSpriteBack.scale.set(1);
        }
    }
});
```

====


#### Function: resize(PIXI, input)

This function is called everytime the browser window is resized.

```javascript
SPF.set({
});
```

====


#### Function: mouseDownTouchStart (PIXI, input)

This function is called on mouseDown events on desktop browsers and touchStart events on mobile browsers.

```javascript
SPF.set({
});
```

====


#### Function: mouseUpTouchEnd (PIXI, input)

This function is called on mouseUp events on desktop browsers and touchEnd events on mobile browsers.

```javascript
SPF.set({
});
```

====


#### Function: mouseOver (PIXI, input)

This function is called on mouseOver events on desktop browsers. This functionality is only available on the Foreground layer.

```javascript
SPF.set({
});
```

====


#### Function: mouseOut (PIXI, input)

This function is called on mouseOut events on desktop browsers. This functionality is only available on the Foreground layer.

TODO: Add example code.

```javascript
SPF.set({
});
```

====


### SPF.info({...})

Inside SPF.info the following properties are available:

<dl>
  <dt>debug (Boolean)</dt>
  <dd>Valid values are "true" and "false".</dd>
 
  <dt>tip (String)</dt>
  <dd>Add a description on how to interact with your visual.</dd>

  <dt>title (String)</dt>
  <dd>The title of your visual.</dd>

  <dt>firstName (String)</dt>
  <dd>Your first name.</dd>

  <dt>lastName (String)</dt>
  <dd>Your last name.</dd>

  <dt>email (String)</dt>
  <dd>Your email address.</dd>

  <dt>section (String)</dt>
  <dd>Id of the section of the song this visual is preferable prepared for. Valid values are "s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9" and "s10".</dd>
</dl>

#### Example

```javascript
SPF.info({
    debug: false,
    tip: "Move your move around to generate nice effects.",
    title: "Mouse movement example",
    firstName: "Ramiro",
    lastName: "Espada",
    email: "re@ramiroespada.com",
    section: "s4"
});
```

====


### Input Object

The input object provides handy variables for use in your visual.

The follow types of graphics are available in the input object:

* Pattern: tilling jpgs
* Graphics: transparent pngs
* Maskers: fullscreen jpgs to be used as a mask for other layers
* Colors


====


#### input.dom

Returns a DOM Object.

TODO: Write description + example.


====


#### input.container

Returns a DisplayObject.

TODO: Write description + example.


====


#### input.resolution

Returns an Integer (The same as window.devicePixelRatio)

TODO: Write description + example.


====


#### input.width

Returns an Integer.

TODO: Write description + example.


====


#### input.height

Returns an Integer.

TODO: Write description + example.


====


#### input.frameRate

Returns an Integer.

TODO: Write description + example.


====


#### input.patterns

Returns an object with one or more PIXI.Texture instances.

* input.patterns.animaltech
* input.patterns.bbbbird1
* input.patterns.bbbbird2
* input.patterns.botanicorganic1
* input.patterns.botanicorganic2
* input.patterns.botanicorganic3
* input.patterns.handdrawnanimal


====


#### input.maskers

Returns an object with one or more PIXI.Texture instances.

* input.maskers.bbbbird1
* input.maskers.botanicorganic1
* input.maskers.botanicorganic2
* input.maskers.handdrawnanimal1
* input.maskers.handdrawnanimal2
* input.maskers.handdrawnanimal3
* input.maskers.handdrawnanimal4


====


#### input.graphics

Returns an object with one or more PIXI.Texture instances.

* input.graphics.animaltech
* input.graphics.bbbbird1
* input.graphics.bbbbird2
* input.graphics.bbbbird3
* input.graphics.botanicorganic
* input.graphics.handdrawnanimal1
* input.graphics.handdrawnanimal2
* input.graphics.handdrawnanimal3


====


#### input.colors

Returns an Array of recommended Hexadecimal colors.

TODO: Write description + example.


====


#### input.isTouchDevice

Returns a Boolean value.

TODO: Write description + example.


====


#### input.orientation

Returns an Object.

example: { gamma: 0, beta: 0, alpha: 0 }

Only available for touchDevices.


====


#### input.mouseTouchPosition

Returns an Object.

example: { x: 0, y: 0 }

On Desktop the cursor position is returned, on touchDevice the tapMove position is returned.


====


#### input.audio

Returns a WebAudioAnalyser instance.

Using the web-audio-analyser package, see [https://github.com/hughsk/web-audio-analyser](https://github.com/hughsk/web-audio-analyser) for documentation.


====


#### input.sections

Returns a String representing the current section of the music video.

Available values: "intro", "verse1", "preChorus1", "chorus1", "verse2", "preChorus2", "chorus2", "bridge", "chorus3", "outro".


====


#### input.currentSection

Returns an Object.

TODO: Write description + example.

example: { "id": "section1", starts: "0", ends: "10" }


====


#### input.editing

Returns an Object.

TODO: Write description + example (editing.vtt).

examples: { "id": "fullBand" } { "id": "closeUp" }

====


#### input.cast

Returns an Object.

TODO: Write description + example (cast.vtt).

examples: { "id": "singer" } { "id": "drummer" } { "id": "bass" } { "id": "all" }

====


#### input.beat

Returns an Object.

TODO: Write description + example (beat.vtt).

examples: { "id": "onBeat" } { "id": "offBeat" }


====


#### input.styling

Returns an Object.

TODO: Write description + example (styling.vtt).

examples: { "id": "none" } { "id": "black" }


====


### Helpers

TODO: Explain what helpers is.


====


#### midgroundMask

Returns a Boolean.

TODO: Write description + example.

Original note I'm not 100% sure what means: // if current instance is set at = "mid" this layer will be masked the video


====


#### fullscreenSprite

Returns a PIXI.Sprite.

TODO: Write description of what you would use the PIXI.Sprite for.




