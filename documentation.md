# CodeTheWave Framework Documentation

SPFramework is a small framework to help digital artists to collaborate in the creation of an unique interactive video reactive experience for Scarlet Pleasure with the supoort of B&O Play.

Library is located at http://scarletpleasure.molamil.com/sp-framework.js


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


## How to create a visual:

### 1. Include the library (sp-framework.js)

### 2. Create a background layer:

```
SPF.set({
    at:"back"
});
```

### 3. Preload the assets you want to use in your visual:

```
SPF.set({
    at: "back",
    load: function(PIXI, input) {
        return [input.patterns.botanicorganic1, input.maskers.handdrawnanimal1]; //  array of: patterns, maskers or graphics
    }
});
```

### 4. Create the methods you need to use to create your magic:

Set the methods you need to use to create your magic:

```
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


```
SPF.info({
    debug:true, // boolean
    tip:"Use your mouse to create particles", // description on how to interact with your visual
    firstName:"Ramiro",
    lastName:"Espada"
    section: "s1" // id of the section of the song this visual is preferable prepared for.
});
```

### 7. Start the framework to test it all together!

```
SPF.start();
```


The follow types of graphics are available in the framework:

* Pattern: tilling jpgs
* Graphics: transparent pngs
* Maskers: fullscreen jpgs to be used as a mask for other layers
* Colors

