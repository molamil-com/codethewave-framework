# CodeTheWave Framework Documentation

SPFramework is a small framework to help digital artists to collaborate in the creation of an unique interactive video reactive experience for Scarlet Pleasure with the supoort of B&O Play.

Library is located at http://scarletpleasure.molamil.com/sp-framework.js


## Table of Contents

* [How it works](#markdown-header-how-it-works)
* [A few rules to follow to improve your chances of having your graphics selected](#markdown-header-a-few-rules-to follow-to-improve-your-chances-of-having-your-graphics-selected)
* [How to create a visual](#markdown-header-how-to-create-a-visual)
* [Framework functions](#markdown-header-framework-functions)


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


### SPF.set({...})

Inside SPF.set the following properties and functions are available:


#### Property: at (String)

This property determines in which layer your script will run. The valid values are:

* back
* mid
* fore

##### Example

```javascript
SPF.set({
    at: "back"
});
```


#### Function: load(PIXI, input)

This function preloads assets for use in the visual. By specifying the needed assets load-time is optimized compared to loading all available assets.

This function should always return an array.

##### Example

```javascript
SPF.set({
    load: function(PIXI, input) {
        return [input.graphics.animaltech,input.graphics.bbbbird1, input.graphics.bbbbird2, input.graphics.bbbbird3, input.graphics.botanicorganic, input.graphics.handdrawnanimal1, input.graphics.handdrawnanimal2, input.graphics.handdrawnanimal3];
    }
});
```


#### Function: init(PIXI, input)

TODO: Write description + example.


#### Function: render(PIXI, input)

TODO: Write description + example.


#### Function: resize(PIXI, input)

TODO: Write description + example.


#### Function: mouseDownTouchStart (PIXI, input)

TODO: Write description + example.


#### Function: mouseUpTouchEnd (PIXI, input)

TODO: Write description + example.


#### Function: mouseOver (PIXI, input) only available on Foreground

TODO: Write description + example.


#### Function: mouseOver (PIXI, input) only available on Foreground

TODO: Write description + example.


====


### SPF.info({...})

Inside SPF.info the following methods and objects are available:


#### Property: debug (Boolean)

Valid values are true and false.


#### Property: tip (String)

Description on how to interact with your visual.


#### Property: title (String)

The title of your visual.


#### Property: firstName (String)

Your first name.


#### Property: lastName (String)

Your last name.


#### Property: email (String)

Your email address.


#### Property: section (String)

Id of the section of the song this visual is preferable prepared for.

Valid values are "s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9" and "s10".


====


### Input Object

The input object provides handy variables for use in your visual.

The follow types of graphics are available in the input object:

* Pattern: tilling jpgs
* Graphics: transparent pngs
* Maskers: fullscreen jpgs to be used as a mask for other layers
* Colors


#### input.dom (DOM Object)

TODO: Write description + example.


#### input.container (DisplayObject)

TODO: Write description + example.


#### input.resolution (Number)

TODO: Write description + example.


#### input.width (Number)

TODO: Write description + example.


#### input.height (Number)

TODO: Write description + example.


#### input.frameRate (Number)

TODO: Write description + example.


#### input.patterns (Object of several PIXI.Texture)

* input.patterns.animaltech
* input.patterns.bbbbird1
* input.patterns.bbbbird2
* input.patterns.botanicorganic1
* input.patterns.botanicorganic2
* input.patterns.botanicorganic3
* input.patterns.handdrawnanimal


#### input.maskers (Object of several  of PIXI.Texture)

* input.maskers.bbbbird1
* input.maskers.botanicorganic1
* input.maskers.botanicorganic2
* input.maskers.handdrawnanimal1
* input.maskers.handdrawnanimal2
* input.maskers.handdrawnanimal3
* input.maskers.handdrawnanimal4


#### input.graphics (Object of several  of PIXI.Texture)

* input.graphics.animaltech
* input.graphics.bbbbird1
* input.graphics.bbbbird2
* input.graphics.bbbbird3
* input.graphics.botanicorganic
* input.graphics.handdrawnanimal1
* input.graphics.handdrawnanimal2
* input.graphics.handdrawnanimal3


#### input.colors (Array of Hexadecimal colors)

TODO: Write description + example.


#### input.isTouchDevice (Boolean)

TODO: Write description + example.


#### input.orientation (Object) example: { gamma: 0, beta: 0, alpha: 0 }

Only available for touchDevices.


#### input.mouseTouchPosition (Object) example: { x: 0, y: 0 }

On Desktop the cursor position is returned, on touchDevice the tapMove position is returned.


#### input.audio (WebAudioAnalyser)

Using the web-audio-analyser package, see that for more documentation.


#### input.sections (String)

Returns thecurrect section of the music video.

Available values: "intro", "verse1", "preChorus1", "chorus1", "verse2", "preChorus2", "chorus2", "bridge", "chorus3", "outro".


#### input.currentSection (Object) example: { "id": "section1", starts: "0", ends: "10" }

TODO: Write description + example.


#### input.editing (JSON Object) examples: { "id": "fullBand" } { "id": "closeUp" }

TODO: Write description + example (editing.vtt).


#### input.cast (JSON Object) examples: { "id": "singer" } { "id": "drummer" } { "id": "bass" } { "id": "all" }

TODO: Write description + example (cast.vtt).


#### input.beat (JSON Object) examples: { "id": "onBeat" } { "id": "offBeat" }

TODO: Write description + example (beat.vtt).


#### input.styling (JSON Object) examples: { "id": "none" } { "id": "black" }

TODO: Write description + example (styling.vtt).


### Helpers

TODO: Explain what helpers is.


#### midgroundMask (Boolean)

TODO: Write description + example.

Original note I'm not 100% sure what means: // if current instance is set at = "mid" this layer will be masked the video


#### fullscreenSprite (PIXI.Texture)

returns (PIXI.Sprite).

TODO: Write description of what you would use the PIXI.Sprite for.


