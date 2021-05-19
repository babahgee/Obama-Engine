# Canvas Renderer
``Canvas Render instance``

- - -

## Intro
The ``Canvas Renderer`` instance is the most important instances in this entire project. This allows you to create and render graphics on the web. Without this instance, you cannot show any graphics.

## Required arguments
The ``Canvas Renderer`` instance requires 3 arguments, I will list the required arguments.
1. width ``number`` | Canvas width
2. height ``number`` | Canvas height
3. options ``number`` :
  - lockToWindowSize ``boolean`` | Locks the canvas when resize
  - contextMenu ``boolean`` | Disables or enables context menu
  - globalVariables ``boolean`` | Set variables applied to this instance to globa.

## Methods

- ``AppendToElement(element)`` Appends instance to a element. Requires one argument which has to be a ``HTMLElement``.
- ``SetBackgroundColor(color)`` Sets background color. Requires one argument which has to be either an ``string`` or an ``array``.
- ``Destroy(renderObject)`` Destroys a render object applied to this instance. Requires one argument which has to be a ``RenderObject`` instance.
- ``Render()`` Renders render object applied to this object. Requires no arguments.

## Example
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


// Start drawing objects here.


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
