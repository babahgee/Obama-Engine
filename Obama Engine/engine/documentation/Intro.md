# Obama Engine, web graphics engine.

### By Babah Gee (Rohan Kanhaising)

- - -

## What is Obama Engine?
Obama Engine is a 2D graphics engine made for the web. With Obama Engine, you can easily create graphics without spending hours into coding the actual pure JavaScript code. 
The engine, or framework (depends on how you wanna call it), is honestly designed to create 2D video games for the web, but I decided to make it open source. 

## Why the name 'Obama Engine'?
Well, I am such a fan of America's 44th president, Barack Obama. A little while ago I saw a funny giv, this one ![obama gaming]![Alt Text](https://tenor.com/view/obama-gaming-sphere-gif-14514677) and I 
that inspired me to create video games. I started with a simple 2D video game called Project: Save Obama which got renamed to Secret Agent: Obama. The goal of that game
was to save current USA president Joe Biden from Donald Trump. So just a stupid silly joke video game, nothing againts these presidents. After a while coding on the game I noticed
that there is a lack of support which I didn't made. It should be running on a pre-made engine which should make it easier for me to create the game. So now I am coding on Obama Engine
and try to create that game again, but more efficient.

## What can you do with it?
Well, you can't do much at the moment but there I am working on it. I try to make it as efficient as I can, and optimized. Again, it's a 2D graphics engine for the web so do not expect
a lot from this :).

## Can I see a quick example of the Obama Engine syntax?
```javascript
// Imports Obama Engine
import * as ObamaEngine from "./engine";

// Canvas options
const RendererOptions = {
    lockToWindowSize: true,
    contextMenu: false,
    globalVariables: true
}

// Creates a canvas called 'renderer'.
const Renderer = new ObamaEngine.Canvas(window.innerWidth, window.innerHeight, RendererOptions);

// Sets a black background color.
Renderer.SetBackgroundColor([0, 0, 0]);

// Set the canvas instance and the 2D context to global.
ObamaEngine.SetGlobalCanvasRenderer(Renderer);

// Append canvas renderer into body element.
Renderer.AppendToElement(document.body);

// Create a camera.
const Camera = new ObamaEngine.Camera(0, 0, Renderer.width, Renderer.height).ApplyTo(Renderer);

// Create a simple rectangle
const MyRectangle = new ObamaEngine.Rectangle(120, 120, 420, 69, {
	backgroundColor: [255, 255, 255]
});

// Native update function.
function Update() {
	
	// Render the canvas.
	Renderer.Render();
	
	// Request an animation frame.
	window.requestAnimationFrame(Update);
}

// Call the update function when the webpage has been loaded.
window.addEventListener("load", Update);
```
