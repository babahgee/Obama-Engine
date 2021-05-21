# Camera
```javascript
class Camera;
```

- - -

## Intro
The Camera instance allows you to render a specific part of the canvas renderer. If you have a scene for example that has the width and the height of the user their browser, you don't really have to create a instance. If you have a bigger scene that, you may want a camera for this to render specific parts.

## Required arguments
The ``Camera`` instance requires 4 arguments when creating. I will list them for you.

1. x ``number`` | Defines the x position.
2. y ``number`` | Defines the y position.
3. width ``number`` | Sets the width of the camera.
4. height ``number`` | Sets the height of the camera.

## Methods

- ``ApplyTo(canvasInstance)`` | Applies camera to a canvas renderer instance. Requires one argument which has to be a ``Canvas Renderer`` instance.
- ``UpdateOffset(x, y)`` | Updates the render offset. Requires two arguments which both has to be a ``number``.
- ``Center(boolean)`` | Centers the camera to the render instance size. NOTE: There has to be a render object applied to this instance in order to center. Requires one argument that has to be a ``boolean``.
-  ``SetTo(renderObject)`` | Sets this camera instance to a render object, this instance will follow that render object. Requires on argument which has to be a ``Render Object`` instance.

## Examples

### Example 1 - Normal camera view.
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

### Example 2 - Sets a ``Render Object`` to camera instance.
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
	backgroundColor: [255, 255, 255]
}).ApplyTo(Renderer);

Camera.SetTo(MyEpicRectangle);

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
