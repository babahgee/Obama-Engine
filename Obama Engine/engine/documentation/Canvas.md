# Canvas Renderer
``Canvas Render instance``

- - -

## Intro
The ``Canvas Renderer`` instance is the most important instances in this entire project. This allows you to create and render graphics on the web. Without this instance, you cannot show any graphics. Here a example how to create a Canvas Renderer instance.

## Required arguments.
The ``Canvas Renderer`` instance requires 3 arguments, I will list the required arguments.
1 width ``number`` | Canvas width
2 height ``number`` | Canvas height
3 options ``number`` 
  - lockToWindowSize ``boolean`` | Locks the canvas when resize
  - contextMenu ``boolean`` | Disables or enables context menu
  - globalVariables ``boolean`` | Set variables applied to this instance to globa.

## Example
```javascript
// Import Obama Engine.
import * as ObamaEngine from "./engine/main.js";

const RendererOptions = {
    lockToWindowSize: true,
    contextMenu: false,
    globalVariables: true
}

const Renderer = new ObamaEngine.Canvas(window.innerWidth, window.innerHeight, RendererOptions);
```
