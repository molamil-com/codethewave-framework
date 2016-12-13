# Code The Wave Framework

[CodeTheWave.com](http://www.codethewave.com) is an interactive platform that lets everyone create their own music video for the song "The Wave" by the band [Scarlet Pleasure](http://www.scarletpleasure.dk).

This is the JavaScript framework used to produce the graphics which users can choose between on [CodeTheWave.com](http://www.codethewave.com).

A jury will select the best contributions to be included on [CodeTheWave.com](http://www.codethewave.com) but even if your contribution isn't selected you can still share your contribution yourself. We will only include visuals which works and adapts to different screen sizes and don't contain errors.


## What it looks like

You can see an example running on [CodePen](http://codepen.io/ramiroespada/pen/AXYEra) - Please use Google Chrome as other browsers have CORS issues with the video when running on CodePen.

The music video is divided into 10 different parts:

1. Verse 1
2. Pre-chorus 1
3. Chorus 1
4. Verse 2
5. Pre-chorus 2
6. Chorus 2
7. Bridge
8. Pre-chorus 3
9. Chorus 3
10. Outro

When creating a personal music video on [CodeTheWave.com](http://www.codethewave.com) the user will select a different script for each part. A unique url is then generated for each combination of graphics/sections and the user can share their video.


## Getting started

You can work with the framework in two different ways: Directly on CodePen (Recommended) or locally by cloning this repository. Note: If you work locally you have to copy your code to CodePen when done so we can find it and include it on [CodeTheWave.com](http://www.codethewave.com). 


### Working directly on CodePen

The recommended method is to work directly on CodePen. You don't have to setup a development environment or copy-paste your code online when done.

There are several example Pens that you can fork and use as a starting point for your work:

* [Example using all available functions](http://codepen.io/codethewave/pen/EgQavq)
* [VideoMasking](http://codepen.io/codethewave/pen/WGXaZq)
* [WebAudioAnalyser](http://codepen.io/codethewave/pen/ozoavo)
* [Cast](http://codepen.io/codethewave/pen/ZpaqzW)
* [Editing](http://codepen.io/codethewave/pen/WGXgVB)
* [Styling](http://codepen.io/codethewave/pen/ZpargQ)
* [FullscreenSprite](http://codepen.io/codethewave/pen/PGOdAy)
* [Layers](http://codepen.io/codethewave/pen/LROJKj)
* [MaskingPattern](http://codepen.io/codethewave/pen/PGOdvy)
* [MaskingVideo](http://codepen.io/codethewave/pen/dpkqwz)
* [MouseTouchPosition](http://codepen.io/codethewave/pen/ozoPQw)
* [MultipleGraphics](http://codepen.io/codethewave/pen/KgyxBL)
* [Orientation](http://codepen.io/codethewave/pen/ozoPaw)
* [ScrollTilingSprite](http://codepen.io/codethewave/pen/XjzPYm)
* [TilingSprite](http://codepen.io/codethewave/pen/bwYxLm)
* [VideoKey](http://codepen.io/codethewave/pen/PGOdLd)

Just click the "Fork" button in the top right corner and you are up and running.

_Important: Please develop using Google Chrome as other browsers have CORS issues with the video when running on CodePen. This will not be an issue for the users in the end, only during development._


### Setting up local development

If you prefer working locally that is also an option. Just remember that your code needs to go on CodePen when you are done so we are able to find it.

First clone the repository:

```
git@github.com:molamil-com/codethewave-framework.git
```

Go inside the folder and run:

```
npm install
```

Once NPM is done installing start the development server:

```
gulp
```

Choose an example in the [www/examples](www/examples) folder and work from there.


## Documentation

The framework documentation is available here:
[documentation.md](documentation.md)

