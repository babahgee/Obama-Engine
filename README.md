# Obama Engine
## By Rohan Kanhaisingh aka Babah Gee

- - -

### About Obama Engine

Obama Engine is basically just a framework that can be seen as a game engine. I made this to create my own games without writing a lot of code just
to let it work. 

I was previously working on a serious game and there has been huge progress made but I just notice over time that rewriting everything takes a lot of time.
So I decided to make my own engine, including lots of classes and methods to make writing code easier for me. 

### Free-to-use
I'd like to see people using this framework/engine to create their own optimized HTML5 games. So yeah... it is free to use I guess, it just doesn't have much in it now.
I am definitly working a lot on it and I really like it, I am learning a lot about graphics.

### What the engine contains at the moment
This framework/engine (whatever you want to call it) is dynamic so you have to import it as one object. As example:

```javascript
// Import ObamaEngine object.
import * as ObamaEngine from "../../engine/main.js";

// Start writing coding here from the ObamaEngine object.
```

Everything is just in one imported object, in this case 'ObamaEngine'. I did that to make it look clear to read. It's really optimised since you only have to
configurate them. Here is another examle with more code.

```javascript
// Create canvas instance.
const Renderer = new ObamaEngine.Canvas(window.innerWidth, window.innerHeight, RendererOptions);

ObamaEngine.SetGlobalCanvasRenderer(Renderer);

// Append canvas renderer into body element.
Renderer.AppendToElement(document.body);

// Set the background color.
Renderer.SetBackgroundColor([255, 255, 255]);

// Create camera.
const Camera = new ObamaEngine.Camera(0, 0, Renderer.width, Renderer.height).ApplyTo(Renderer);

// Native update function.
function Update() {

    // Render the canvas.
    Renderer.Render();

    // Request an animation frame.
    window.requestAnimationFrame(Update);
}

// Call the update function when the page has been loaded.
window.addEventListener("load", event => {
    Update();
});
```

### Further updates.
I will definitely update this framework/engine by time, I really like working on this. The goal is to create games without writing a lot of code. 
I also need to make a documentary when there has been huge progress made.
