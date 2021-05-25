# Set Global Canvas Renderer
```js
void function SetGlobalCanvasRenderer;
```

- - - 

## Intro
The 'SetGlobalCanvasRenderer' function allows you to make a provided ``Canvas Renderer`` instance a global variable. 
3 global variables will be accessible which are ``globalContext``, ``globalCanvas`` and ``globalCanvasRenderer``.

## Required arguments
```js
ObamaEngine.SetGlobalRenderer(canvasRendererInstance);
```
- ``canvasRendererInstance`` | Provided ``Canvas Renderer`` instance.

## Examples
```js
// Import ObamaEngine object.
import * as ObamaEngine from "../../engine/main.js";

// Create canvas instance.
export const Renderer = new ObamaEngine.Canvas(window.innerWidth, window.innerHeight, RendererOptions);

ObamaEngine.SetGlobalCanvasRenderer(Renderer);

// Append canvas renderer into body element.
Renderer.AppendToElement(document.body);

ObamaEngine.SetGlobalCanvasRenderer(Renderer);
```