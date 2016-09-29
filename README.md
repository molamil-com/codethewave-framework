
# DOCUMENTATION

    RE_documentation.txt


# RE Status log


    TODO (when the final video and sound is ready):
    
        - Play selected section from start (for testing): 0.5
    
        - Link UI navigation with video.currentTime to play the selected section: 1
        
        - Create track: beat.vtt: 4
        
        - Create track: cast.vtt: 6
        
        - Create track: editing.vtt: 6
        
        - Create track: tracking.vtt: 10
        
        - Render video optimized including masking layer: 8
        
        - Review loading and buffering time: 6
        
        - Change mp4 with very low quality mp3 for optimal performance on mobile: 1
        
        
    TODO:
                    
        - Change all framework to absolute based on domain/hosting
               

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
    
   
 