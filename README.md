
# DOCUMENTATION

    RE_documentation.txt


# RE Status log
        
 ### 04-10-2016
 
 ```
 
     Examples:
 
     http://scarletpleasure.molamil.com/examples/VideoMasking.html
     http://scarletpleasure.molamil.com/examples/WebAudioAnalyser.html
     http://scarletpleasure.molamil.com/examples/Cast.html
     
 
 ```
 
### 03-10-2016

```

    Examples:

    http://scarletpleasure.molamil.com/examples/FullscreenSprite.html
    http://scarletpleasure.molamil.com/examples/Layers.html
    http://scarletpleasure.molamil.com/examples/MaskingPattern.html
    http://scarletpleasure.molamil.com/examples/MaskingVideo.html
    http://scarletpleasure.molamil.com/examples/MouseTouchPosition.html
    http://scarletpleasure.molamil.com/examples/MultipleGraphics.html
    http://scarletpleasure.molamil.com/examples/Orientation.html
    http://scarletpleasure.molamil.com/examples/RE-Boids.html
    http://scarletpleasure.molamil.com/examples/RE-MoonTides.html
    http://scarletpleasure.molamil.com/examples/RE-Wave.html
    http://scarletpleasure.molamil.com/examples/ScrollTilingSprite.html
    http://scarletpleasure.molamil.com/examples/TilingSprite.html
    http://scarletpleasure.molamil.com/examples/VideoKey.html
    

```
  

### 19-09-2016

```

  - DEV briefing 
  
  - Adding sections starts

```

### 07-09-2016

```

  - Change test video with The Wave Instrumental

```
      

### 06-09-2016

```

    - Change UI web-fonts

```

### 02-09-2016

```

    - Test IOS10 on iPhone

```
       
### 01-09-2016

```

    - Mobile Audio input performance improvement.
    
    - Fix values when sounds loops.
    
    - Add GA tracking.
    
    - Testing latest changes in CodePen: 
    
        http://codepen.io/ramiroespada/full/mAdyZJ/
    
    - Create prototype page (outside CodePen framework environment) to test switching visuals in the same video:
    
        http://work.molamil.com/trouble/spxboplay/sp-framework/08/frontend-prototype.html
 
```

### 31-08-2016

```

    - Mobile: is not possible to get audioAnalyser data from video: https://stackoverflow.com/questions/36800909/convert-mediaelementaudiosourcenode-to-audiobuffersourcenode
 
    - Audio input working on mobile!! if we can't get the audio data from the video we create an audio instance. 
      
 
```

### 30-08-2016

```
   
    - Create input.sections
   
    - Build CodePen Brand UI
    
    - UI: artist initials
     
    - UI: playHead 
   
    - UI: frame
    
    - UI: sections navigation
    
    - UI: tip
    
    - UI: title
    
    - Meeting/Work session with Trouble: fixing and improving UI details
    
    - Add disclaimer: portrait mode not available please rotate to landscape
    
    - UI: play button

   
```
           
### 29-08-2016

```
    
     - Still trying to fix audio on IOS10
     
     - Create input.sections (in progress)
    
     - Build CodePen Brand UX (in progress)
     
    
```

### 26-08-2016

```
    
     - Still trying to fix audio on IOS10
    
     - Migration changes to PIXI v4!
          
     - Planing meeting
     
     - Video Stop Motion solution if frameRate is under 20
    
     - Status meeting
    
```


### 25-08-2016

```
    
     - Prepare all mock-up vtt files
     
     - Create vtt system to send tracking from video to input
    
     - Trying to fix  input.audio WebAudioAnalyser frequencies always zeros on IOS
      
    
```

### 24-08-2016

```
    
    - Implement all maskers
    
    - Frameworks better documentation and explanation at: RE-documentation.txt
    
    - mouseDownTouchStart
    
    - mouseUpTouchEnd
    
    - input.mousePosition (both desktop and touchDevices
    
    - Test TweenMax with PIXI
    
    - input.orientation
    
    - Add input.colors
     
    
```

      
### 23-08-2016

```
   
    - Fix issue with loader not working with multiple instances.
   
    - Testing textures
    
    - Fix for issue with inline video on IOS10
   
    - Fix masking GPU issue on IOS10
    
    - Tested VTT on IOS
    
    - Implement all textures
    
    - Implement all graphics
    
    - Implement test maskers
    
``` 
    
### 22-08-2016

```
   
    - Fix issue with video resize on NON retina devices!
    
    - Trouble meeting to define Frameworks (Jakob and Marcus)
    
    - Blue print: organizing TO-DOS framework and website
    
    - Change foreground to be on top always.
    
    - Change midground to be able to be masked by the video.

``` 


### 19-08-2016

```
   
    - Video Mask used to mask foreground!
    
    - Getting audio data from video without duplicated instance!
    
    - Video scaling on resize to always fit screen
    
    - Multiple layers of visuals in a single test page.
    
    - Test getting multiple WebVTT data
    
    - Staus input: Top filters, tilt input, codePen helper
       
``` 


### 18-08-2016

```
   
    - Planing meeting.
    
    - Using WebVTT for tracking, audio, cuts and other video events.
    
    
``` 


### 17-08-2016

```
  
    - Fix video not loading masked double video.
    
    - Shooting + notes (see RE-shooting-notes.txt)
    
    - Test tracking (best type of data)
    

``` 


### 12-08-2016

```
    - Video testing IOS 10: Cross Origin issues (I'll need help with CORS)
    
    - Video works when in the same server, but if we want to serve it as framework it needs to work cross-domains.
    
    - Video and Video mask working full color.
    
    - Sync video and video-mask so they play always the same frame.
    
    - Test to remove double video ghost in some browsers/computers.


``` 


### 11-08-2016

```
    - Implement audio library working on iPad (getByteFrequencyData)
    
    - Full color video testing

    - Adding input.with and input.height on init()

``` 

    
### 10-08-2016

```

    - SP framework kick start

    - Early test on IOS 10
    
    - Refactor Assets for loading 
    
    - Create on Resize functionality
      
      
```



    
### required libraries

    require('ios-safe-audio-context');
 
    require('detect-media-element-source');
 
    require('web-audio-player');
 
    require('web-audio-analyser');
 
    require('iphone-inline-video');
    
    require('fps');
    
    require('jquery-stage');
    
    require('universal-ga');
    
    require('screen-orientation');
    
   
 