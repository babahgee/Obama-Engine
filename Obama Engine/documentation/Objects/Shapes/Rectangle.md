# Rectangle
```javascript
class Rectangle extends RenderObject;
```

- - -

## Intro
The 'Rectangle' class allows you to create a rectangle object. This class requires 5 arguments. You can create epic
things with this. It doesn't really have to be a rectangle if you understand what I mean ;).

## Required arguments
- ``x`` | Has to be a number.
- ``y`` | has to be a number.
- ``width`` | Has to be a number.
- ``height`` | Has to be a number.
- ``styles`` | Has to be a object. See down below for available options.

```javascript
{
    backgroundColor: string | arrray,
    borderColor: string | array,
    blurColor: string | array,
    borderWidth: number,
    blurOffsetX: number,
    blurOffsetY: number,
    blurStrength: number,
    globalCompositeOperation: string
}
```

## Properties
- ``x`` | Position in x axis. 
- ``y`` | Position in y axis.
- ``width`` | Rectangle width.
- ``height`` | Rectangle height.
- ``styles`` | Rectangle height.
- ``renderImage`` | Image that will render in rectangle.
- ``renderImageWidth`` | Width of image that will render.
- ``renderImageHeight`` | Height of image that will render.
- ``events`` | Object with events.
- ``eventStates`` | Object with event states.

## Methods
```javascript
On(event, listener);
```
Creates a event listener for this instance.
- ``event`` | Can be any of "``hover``", "``click``" or "``scroll``".
- ``listener`` | Callback.

<br>

```javascript
SetRenderImage(image);
```
Sets a image and render it into this rectangle.
- ``image`` | Requires ``HTMLImage`` element.

<br>

```javascript
ApplyTo(canvasInstance);
```
Applies to canvas instance.
- ``canvasInstance`` | Requires a ``Canvas Renderer`` instance.

## Examples

```javascript
// Import Obama Engine.
import * as ObamaEngine from "./engine/main.js";

// Options for the canvas renderer instance.
const RendererOptions = {
    lockToWindowSize: true,
    contextMenu: false,
    globalVariables: true
}

// Creates a canvas called 'Renderer'.
const Renderer = new ObamaEngine.Canvas(window.innerWidth, window.innerHeight, RendererOptions);

// Append canvas renderer into body element.
Renderer.AppendToElement(document.body);

// Create a camera.
const Camera = new ObamaEngine.Camera(0, 0, Renderer.width, Renderer.height).ApplyTo(Renderer);

// See 'rectangle' for more information.
const MyEpicRectangle = new ObamaEngine.Rectangle(100, 100, 400, 200, {
    backgroundColor: [255, 255, 255],
    borderWidth: 10,
    borderColor: [221, 124, 84],
    blurColor: [255, 255, 255],
    blurStrength: 40,
    globalCompositeOperation: "lighten"
}).ApplyTo(Renderer);


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